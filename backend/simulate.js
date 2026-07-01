const API_URL = 'http://localhost:4000/api/devices';

// The device we are simulating
const DEVICE_ID = 'zone-a';

console.log(`Starting Hardware Simulator for ${DEVICE_ID}...`);
console.log(`Connecting to ${API_URL}\n`);

// Simulate environmental variables
let isNightTime = false;
let ldrValue = 800; // 0-1023 (High = bright daylight)

// This function runs every 5 seconds to simulate the ESP32's loop() function
setInterval(async () => {
  // 1. Randomly simulate day/night transitions
  if (Math.random() > 0.9) {
    isNightTime = !isNightTime;
    console.log(`\n🌞🌍 TIME SHIFT: It is now ${isNightTime ? 'Night' : 'Day'} time!`);
  }

  // Calculate LDR reading (lower in night time)
  ldrValue = isNightTime ? Math.floor(Math.random() * 100) : 700 + Math.floor(Math.random() * 300);

  // 2. Randomly simulate motion (only matters at night usually, but we simulate a car passing)
  // 30% chance of motion
  const motionDetected = Math.random() > 0.7; 
  if (motionDetected) {
    console.log(`🚗 Motion detected at ${new Date().toLocaleTimeString()}!`);
  }

  // 3. Determine base LED brightness based on simulated logic
  // (In a real system, the hardware might determine this, or the server might. 
  // Here we let the hardware simulator determine its default logic).
  let currentBrightness = 0;
  if (isNightTime) {
    currentBrightness = motionDetected ? 255 : 60; // 100% if motion, 25% dim if no motion
  }

  // 4. Poll the backend to see if the Dashboard is manually overriding us
  try {
    const syncRes = await fetch(`${API_URL}/sync/${DEVICE_ID}`);
    const syncData = await syncRes.json();
    
    if (syncData.device && syncData.device.manual_override) {
      console.log(`⚠️  DASHBOARD OVERRIDE ACTIVE! System logic ignored.`);
      // If overridden, we don't change the brightness, we let the backend tell us what it is.
      // But we still report our sensor data.
    } else {
      // 5. Send our computed telemetry back to the server
      const payload = {
        deviceId: DEVICE_ID,
        lightLevel: ldrValue,
        motionDetected: motionDetected,
        ledBrightness: currentBrightness
      };

      await fetch(`${API_URL}/telemetry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      console.log(`📡 Sent Telemetry -> LDR: ${ldrValue} | Motion: ${motionDetected} | LED PWM: ${currentBrightness}`);
    }
  } catch (err) {
    console.log('Failed to connect to backend API. Is the server running?');
  }

}, 5000); // run every 5 seconds
