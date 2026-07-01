import { OAuth2Client } from 'google-auth-library';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '../db/pool.js';

const USERNAME_RE = /^[a-zA-Z0-9_]{3,30}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

function signToken(user) {
  return jwt.sign(
    { id: user.id, username: user.username, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
  );
}

export async function signup(req, res, next) {
  try {
    const { username, email, password } = req.body || {};

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'username, email and password are all required.' });
    }
    if (!USERNAME_RE.test(username)) {
      return res.status(400).json({
        error: 'Username must be 3-30 characters and contain only letters, numbers, or underscores.',
      });
    }
    if (!EMAIL_RE.test(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }
    if (typeof password !== 'string' || password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters long.' });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const { rows } = await query(
      `INSERT INTO users (username, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, username, email, role, created_at`,
      [username, email, passwordHash]
    );

    const user = rows[0];
    const token = signToken(user);

    res.status(201).json({ token, user });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { identifier, password } = req.body || {};
    // `identifier` can be either username or email, for a friendlier login form.

    if (!identifier || !password) {
      return res.status(400).json({ error: 'identifier (username or email) and password are required.' });
    }

    const { rows } = await query(
      `SELECT id, username, email, password_hash, role FROM users
       WHERE username = $1 OR email = $1`,
      [identifier]
    );

    const user = rows[0];
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const matches = await bcrypt.compare(password, user.password_hash);
    if (!matches) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const token = signToken(user);
    res.json({
      token,
      user: { id: user.id, username: user.username, email: user.email, role: user.role },
    });
  } catch (err) {
    next(err);
  }
}

export async function me(req, res, next) {
  try {
    const { rows } = await query(
      'SELECT id, username, email, role, created_at FROM users WHERE id = $1',
      [req.user.id]
    );
    if (!rows[0]) return res.status(404).json({ error: 'User not found.' });
    res.json({ user: rows[0] });
  } catch (err) {
    next(err);
  }
}

export async function googleLogin(req, res, next) {
  try {
    const { credential } = req.body;
    if (!credential) {
      return res.status(400).json({ error: 'Google credential is required' });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    const { sub: googleId, email, name, given_name } = payload;
    
    // Check if user exists
    let { rows } = await query('SELECT * FROM users WHERE google_id = $1 OR email = $2', [googleId, email]);
    let user = rows[0];

    if (user) {
      // Update google_id if matched by email
      if (!user.google_id) {
        await query('UPDATE users SET google_id = $1 WHERE id = $2', [googleId, user.id]);
        user.google_id = googleId;
      }
    } else {
      // Create new user. Default role is viewer. Wait, let's make the very first user an admin.
      const userCountRes = await query('SELECT COUNT(*) FROM users');
      const isFirstUser = parseInt(userCountRes.rows[0].count) === 0;
      const role = isFirstUser ? 'admin' : 'viewer';

      // Generate a unique username
      let usernameBase = (given_name || name || email.split('@')[0]).toLowerCase().replace(/[^a-z0-9_]/g, '');
      if (usernameBase.length < 3) usernameBase += 'user';
      let username = usernameBase.substring(0, 30);
      
      const insertRes = await query(
        `INSERT INTO users (username, email, google_id, role)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [username, email, googleId, role]
      );
      user = insertRes.rows[0];
    }

    const token = signToken(user);
    res.json({
      token,
      user: { id: user.id, username: user.username, email: user.email, role: user.role }
    });
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(401).json({ error: 'Invalid Google token' });
  }
}
