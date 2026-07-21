/*
 * Connectivity Test Sketch — Intelligent Street Lighting Controller
 * -----------------------------------------------------------------
 * Purpose: prove the Arduino -> usb-bridge -> backend -> dashboard
 * pipeline works, WITHOUT any sensors or LEDs wired.
 *
 * It just prints fake-but-changing telemetry once per second in the
 * exact "key:value,key:value" format the bridge expects. When this is
 * running you should see a "Hardware Node (arduino-uno)" card appear on
 * the dashboard within ~5 seconds.
 *
 * Upload steps:
 *   1. Arduino IDE -> Tools -> Board  -> "Arduino Uno"
 *   2. Arduino IDE -> Tools -> Port   -> COM4 (the CH340 port)
 *   3. Click Upload.
 *   4. Close the Serial Monitor, then run `npm run usb` in backend/.
 *      (Only one program can hold COM4 at a time.)
 *
 * Baud rate here (9600) must match the bridge's default.
 */

void setup() {
  Serial.begin(9600);
}

void loop() {
  // Fake values so you can see the dashboard react without real hardware.
  int lightLevel = analogRead(A0);          // floats/random with nothing wired — that's fine
  int motionDetected = (millis() / 3000) % 2; // flips 0/1 every 3 seconds
  int ledBrightness = map(lightLevel, 0, 1023, 0, 255);

  Serial.print("lightLevel:");
  Serial.print(lightLevel);
  Serial.print(",motionDetected:");
  Serial.print(motionDetected);
  Serial.print(",ledBrightness:");
  Serial.println(ledBrightness);

  delay(1000);
}
