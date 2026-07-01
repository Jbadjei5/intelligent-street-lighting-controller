import pool from '../db/pool.js';

export const getSettings = async (req, res) => {
  try {
    const result = await pool.query('SELECT ldr_threshold, pir_timeout, global_override FROM system_settings WHERE id = 1');
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Settings not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
};

export const updateSettings = async (req, res) => {
  const { ldr_threshold, pir_timeout, global_override } = req.body;
  try {
    const result = await pool.query(
      `UPDATE system_settings 
       SET ldr_threshold = COALESCE($1, ldr_threshold),
           pir_timeout = COALESCE($2, pir_timeout),
           global_override = COALESCE($3, global_override),
           updated_at = NOW()
       WHERE id = 1
       RETURNING ldr_threshold, pir_timeout, global_override`,
      [ldr_threshold, pir_timeout, global_override]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({ error: 'Failed to update settings' });
  }
};
