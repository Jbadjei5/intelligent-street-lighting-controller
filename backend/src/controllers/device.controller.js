import pool from '../db/pool.js';

// Get all devices
export const getDevices = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM devices ORDER BY name ASC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching devices:', error);
    res.status(500).json({ error: 'Failed to fetch devices' });
  }
};

// Handle incoming telemetry from physical hardware
export const postTelemetry = async (req, res) => {
  const { deviceId, lightLevel, motionDetected, ledBrightness, baselineBrightness } = req.body;

  if (!deviceId) {
    return res.status(400).json({ error: 'deviceId is required' });
  }

  try {
    // 1. Log the reading into device_logs for stats
    await pool.query(
      `INSERT INTO device_logs (light_level, motion_detected, led_brightness, baseline_brightness)
       VALUES ($1, $2, $3, $4)`,
      [lightLevel, motionDetected, ledBrightness, baselineBrightness || 255]
    );

    // 2. Update the device's current state in the devices table
    // If it's a new device, we insert it automatically
    await pool.query(
      `INSERT INTO devices (id, name, status, current_brightness, motion_detected, last_seen)
       VALUES ($1, $2, 'online', $3, $4, NOW())
       ON CONFLICT (id) DO UPDATE 
       SET status = 'online',
           current_brightness = EXCLUDED.current_brightness,
           motion_detected = EXCLUDED.motion_detected,
           last_seen = NOW()`,
      [deviceId, `Hardware Node (${deviceId})`, ledBrightness || 0, motionDetected || false]
    );

    res.json({ success: true });
  } catch (error) {
    console.error('Error posting telemetry:', error);
    res.status(500).json({ error: 'Failed to process telemetry' });
  }
};

// Toggle manual override from the dashboard
export const overrideDevice = async (req, res) => {
  const { id } = req.params;
  const { manual_override, target_brightness } = req.body;

  try {
    // In a real system, the ESP32 would poll this state.
    const result = await pool.query(
      `UPDATE devices 
       SET manual_override = $1, 
           current_brightness = COALESCE($2, current_brightness)
       WHERE id = $3
       RETURNING *`,
      [manual_override, target_brightness, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Device not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error overriding device:', error);
    res.status(500).json({ error: 'Failed to override device' });
  }
};

// Hardware Polling Endpoint: Returns global settings and device-specific overrides
export const syncDevice = async (req, res) => {
  const { id } = req.params;
  
  try {
    // Get global settings
    const settingsRes = await pool.query('SELECT ldr_threshold, pir_timeout, global_override FROM system_settings WHERE id = 1');
    const settings = settingsRes.rows[0] || { ldr_threshold: 150, pir_timeout: 30, global_override: false };

    // Get device specific override if it exists
    let deviceState = null;
    if (id) {
      const deviceRes = await pool.query('SELECT manual_override FROM devices WHERE id = $1', [id]);
      if (deviceRes.rows.length > 0) {
        deviceState = deviceRes.rows[0];
      }
    }

    res.json({
      settings,
      device: deviceState
    });
  } catch (error) {
    console.error('Error syncing device:', error);
    res.status(500).json({ error: 'Failed to sync' });
  }
};
