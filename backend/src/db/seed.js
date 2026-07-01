import { query } from './pool.js';

// Generates ~30 days of realistic-looking device_logs data (one reading
// per hour) so the /api/stats endpoint has real numbers to compute from.
async function seed() {
  const { rows } = await query('SELECT COUNT(*)::int AS count FROM device_logs');
  if (rows[0].count > 0) {
    console.log(`device_logs already has ${rows[0].count} rows — skipping seed.`);
    process.exit(0);
  }

  console.log('Seeding device_logs with 30 days of hourly sample readings...');

  const now = Date.now();
  const hours = 24 * 30;
  const values = [];
  const params = [];
  let i = 1;

  for (let h = hours; h >= 0; h--) {
    const ts = new Date(now - h * 60 * 60 * 1000);
    const hourOfDay = ts.getHours();
    const isNight = hourOfDay >= 18 || hourOfDay <= 6;

    // LDR: lower value (darker) at night, higher (brighter) during the day
    const lightLevel = isNight
      ? Math.floor(Math.random() * 150)
      : Math.floor(400 + Math.random() * 600);

    // Motion is only meaningful at night when lights would react to it
    const motionDetected = isNight && Math.random() < 0.35;

    // Smart logic: lights off during day, dim baseline at night, bright on motion
    let ledBrightness = 0;
    if (isNight) {
      ledBrightness = motionDetected ? 255 : 60;
    }

    const baselineBrightness = isNight ? 255 : 0; // "dumb" street light: full on all night, off all day

    const isOnline = Math.random() > 0.01; // ~99% uptime

    values.push(
      `($${i++}, $${i++}, $${i++}, $${i++}, $${i++}, $${i++})`
    );
    params.push(ts.toISOString(), lightLevel, motionDetected, ledBrightness, baselineBrightness, isOnline);
  }

  const sql = `
    INSERT INTO device_logs
      (recorded_at, light_level, motion_detected, led_brightness, baseline_brightness, is_online)
    VALUES ${values.join(', ')}
  `;

  await query(sql, params);
  console.log(`Seeded ${hours + 1} device_logs rows.`);
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
