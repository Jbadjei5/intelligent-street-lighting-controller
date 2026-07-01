import { query } from '../db/pool.js';

// GET /api/stats
// Public endpoint backing the website's "Stats" strip.
// Some figures are fixed facts about the project (years of research,
// number of sensor types, PWM channel count); the rest are computed
// live from device_logs so they reflect real logged data.
export async function getStats(req, res, next) {
  try {
    const { rows } = await query(`
      SELECT
        COUNT(*)::int AS total_readings,
        COUNT(*) FILTER (WHERE motion_detected)::int AS motion_events,
        COUNT(*) FILTER (WHERE is_online)::int AS online_readings,
        COALESCE(SUM(baseline_brightness), 0)::float AS total_baseline_brightness,
        COALESCE(SUM(led_brightness), 0)::float AS total_actual_brightness
      FROM device_logs
    `);

    const r = rows[0];

    const uptimePercent = r.total_readings > 0
      ? Math.round((r.online_readings / r.total_readings) * 100)
      : null;

    // Energy saved = how much less power was used vs. a "dumb" always-on
    // baseline light, expressed as a percentage.
    const energySavedPercent = r.total_baseline_brightness > 0
      ? Math.round(
          ((r.total_baseline_brightness - r.total_actual_brightness) / r.total_baseline_brightness) * 100
        )
      : null;

    res.json({
      stats: [
        {
          label: 'YEARS OF RESEARCH',
          value: process.env.STAT_YEARS_OF_RESEARCH || '2+',
          source: 'static',
        },
        {
          label: 'SENSORS INTEGRATED',
          value: process.env.STAT_SENSORS_INTEGRATED || '2',
          source: 'static',
        },
        {
          label: 'PWM CHANNELS',
          value: process.env.STAT_PWM_CHANNELS || '6',
          source: 'static',
        },
        {
          label: 'ENERGY SAVED',
          value: energySavedPercent !== null ? `${energySavedPercent}%` : 'N/A',
          source: 'computed',
        },
      ],
      details: {
        totalReadings: r.total_readings,
        motionEvents: r.motion_events,
        uptimePercent,
        energySavedPercent,
      },
    });
  } catch (err) {
    next(err);
  }
}
