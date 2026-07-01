import { query } from './pool.js';
import bcrypt from 'bcryptjs';

async function addAdmin() {
  const username = 'admin';
  const email = 'admin@example.com';
  const password = 'admin';

  console.log('Creating admin user...');
  const passwordHash = await bcrypt.hash(password, 12);

  try {
    const { rows } = await query(
      `INSERT INTO users (username, email, password_hash)
       VALUES ($1, $2, $3)
       ON CONFLICT (username) DO NOTHING
       RETURNING id, username, email`,
      [username, email, passwordHash]
    );

    if (rows.length > 0) {
      console.log('Admin user created successfully:', rows[0].username);
    } else {
      console.log('Admin user already exists.');
    }
  } catch (err) {
    console.error('Error creating admin:', err);
  } finally {
    process.exit(0);
  }
}

addAdmin();
