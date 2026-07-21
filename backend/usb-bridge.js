import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';

const API_URL = process.env.API_URL || 'http://localhost:4000/api/devices';
const DEFAULT_BAUD = 9600;
const DEVICE_ID = 'arduino-uno';

// Known USB vendor IDs for Arduino Uno and common clones (used for auto-detection)
// 2341 = Arduino LLC, 2A03 = Arduino.org, 1A86 = CH340 (clones), 0403 = FTDI, 10C4 = CP210x
const ARDUINO_VENDOR_IDS = ['2341', '2a03', '1a86', '0403', '10c4'];

// Parse command line arguments
const args = process.argv.slice(2);
let portPath = args[0];

// Try to automatically find an Arduino among the available serial ports.
// Returns the matching port path, or null if none can be confidently identified.
async function autoDetectArduino() {
  const ports = await SerialPort.list();

  if (ports.length === 0) {
    console.log('No serial ports found. Make sure your Arduino is plugged in via USB.');
    return null;
  }

  console.log('Available serial ports:');
  ports.forEach(p => {
    const vid = (p.vendorId || '').toLowerCase();
    console.log(`  - ${p.path} (${p.manufacturer || 'Unknown'}${vid ? `, VID:${vid}` : ''})`);
  });

  // A real Arduino connects over USB, so it exposes a USB vendorId. Motherboard
  // ports (e.g. "Intel(R) Active Management Technology - SOL", a PCI device) and
  // Bluetooth serial links have no USB vendorId — they must never be treated as
  // an Arduino, or the bridge "connects successfully" to a port that sends nothing.
  const isUsbPort = (p) =>
    Boolean(p.vendorId) &&
    !/^PCI\\/i.test(p.pnpId || '') &&
    !/BTHENUM/i.test(p.pnpId || '');

  const usbPorts = ports.filter(isUsbPort);

  // 1. Prefer a USB port whose vendor ID matches a known Arduino/clone chip.
  const byVendor = usbPorts.find(p =>
    ARDUINO_VENDOR_IDS.includes(p.vendorId.toLowerCase())
  );
  if (byVendor) {
    console.log(`\n🔎 Auto-detected Arduino by vendor ID on ${byVendor.path}.`);
    return byVendor.path;
  }

  // 2. Fall back to matching common manufacturer strings on a USB port.
  const byManufacturer = usbPorts.find(p =>
    /arduino|wch|ch340|ftdi|silicon labs|cp210/i.test(p.manufacturer || '')
  );
  if (byManufacturer) {
    console.log(`\n🔎 Auto-detected Arduino by manufacturer on ${byManufacturer.path}.`);
    return byManufacturer.path;
  }

  // 3. If exactly one USB serial device exists, use it as a best guess.
  if (usbPorts.length === 1) {
    console.log(`\n🔎 One USB serial device found; using ${usbPorts[0].path}.`);
    return usbPorts[0].path;
  }

  // Nothing that looks like an Arduino. Explain what was skipped so the user
  // isn't misled by non-Arduino ports like Intel AMT (COM3) or Bluetooth links.
  if (usbPorts.length === 0 && ports.length > 0) {
    console.log('\n⚠️  No USB serial device found. The port(s) above are not an Arduino:');
    console.log('   • "Intel ... Active Management Technology (SOL)" is a built-in motherboard port.');
    console.log('   • "Standard Serial over Bluetooth link" is a Bluetooth port.');
    console.log('   Your board is powered (LED on) but is NOT enumerating as a USB serial device.');
    console.log('   → Try a different USB data cable, a different USB port, or test the board on another PC.');
  }

  return null;
}

async function main() {
  console.log('====================================================');
  console.log('🔌 Arduino USB Serial Bridge');
  console.log('====================================================\n');

  // No port supplied → try to auto-detect one.
  if (!portPath) {
    console.log('No port specified — scanning for an Arduino...\n');
    portPath = await autoDetectArduino();

    if (!portPath) {
      console.log('\nCould not confidently identify an Arduino automatically.');
      console.log('Please specify the serial/COM port manually.');
      console.log('Usage:   node usb-bridge.js <port-name> [baud-rate]');
      console.log('Example: node usb-bridge.js COM3');
      console.log('====================================================');
      process.exit(1);
    }
  }

  const baudRate = parseInt(args[1], 10) || DEFAULT_BAUD;

  console.log(`Connecting to port ${portPath} at ${baudRate} baud...`);
  
  const port = new SerialPort({
    path: portPath,
    baudRate: baudRate,
    autoOpen: false
  });

  const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

  port.open((err) => {
    if (err) {
      console.error(`❌ Failed to open port ${portPath}:`, err.message);
      process.exit(1);
    }
    console.log(`✅ Serial port ${portPath} opened successfully!`);
    console.log(`📡 Relaying telemetry to ${API_URL}/telemetry...\n`);
  });

  parser.on('data', async (line) => {
    const rawData = line.trim();
    if (!rawData) return;
    
    console.log(`[Serial Raw]: ${rawData}`);

    let telemetryData = null;

    // 1. Try to parse as JSON
    try {
      telemetryData = JSON.parse(rawData);
    } catch (e) {
      // 2. Try to parse as comma separated key-value pairs (e.g. ldr:500,motion:1,led:100)
      try {
        const pairs = rawData.split(',');
        const parsed = {};
        pairs.forEach(pair => {
          const [key, val] = pair.split(':');
          if (key && val) {
            const trimmedKey = key.trim();
            const trimmedVal = val.trim();
            // Convert numbers and booleans
            if (trimmedVal.toLowerCase() === 'true' || trimmedVal === '1') {
              parsed[trimmedKey] = true;
            } else if (trimmedVal.toLowerCase() === 'false' || trimmedVal === '0') {
              parsed[trimmedKey] = false;
            } else if (!isNaN(trimmedVal)) {
              parsed[trimmedKey] = Number(trimmedVal);
            } else {
              parsed[trimmedKey] = trimmedVal;
            }
          }
        });
        if (Object.keys(parsed).length > 0) {
          telemetryData = parsed;
        }
      } catch (err) {
        // Fallback: log parsing error
      }
    }

    if (!telemetryData) {
      console.log(`⚠️  Could not parse serial line. Ensure it is JSON or comma-separated pairs (e.g. "lightLevel:300,motionDetected:1").`);
      return;
    }

    // Map keys to API expected format if different
    // API expects: deviceId, lightLevel, motionDetected, ledBrightness, baselineBrightness
    const payload = {
      deviceId: telemetryData.deviceId || DEVICE_ID,
      lightLevel: Number(telemetryData.lightLevel !== undefined ? telemetryData.lightLevel : telemetryData.ldr || 0),
      motionDetected: Boolean(telemetryData.motionDetected !== undefined ? telemetryData.motionDetected : telemetryData.motion || false),
      ledBrightness: Number(telemetryData.ledBrightness !== undefined ? telemetryData.ledBrightness : telemetryData.led || 0)
    };

    try {
      const response = await fetch(`${API_URL}/telemetry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (response.ok) {
        console.log(`🚀 Telemetry sent -> LDR: ${payload.lightLevel} | Motion: ${payload.motionDetected} | LED: ${payload.ledBrightness}`);
      } else {
        const errText = await response.text();
        console.error(`⚠️  Server rejected telemetry: ${response.status} - ${errText}`);
      }
    } catch (err) {
      console.error(`❌ Failed to send telemetry to backend API:`, err.message);
    }
  });

  port.on('close', () => {
    console.log('🔌 Serial port connection closed.');
  });

  port.on('error', (err) => {
    console.error('❌ Serial port error:', err.message);
  });
}

main();
