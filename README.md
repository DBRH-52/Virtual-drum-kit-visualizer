# 🥁 Virtual Drum Kit Visualizer

A web-based MIDI drum visualizer that listens to incoming MIDI signals and visually highlights drum pads based on the intensity of the hit.

# 🎯 Features
- ✅ Real-time MIDI input detection (Web MIDI API)
- ✅ Velocity-sensitive drum highlighting (more intense hits = bigger animations)

# 🚀 How It Works
- The application listens for MIDI input from connected MIDI devices.
- When a drum pad is hit on the MIDI device, it triggers a visual response by scaling and changing the color of the corresponding drum pad in the visualizer.
- The intensity of the hit is reflected in the scale and color change.

# 🗺️ MIDI Mapping
The virtual drum kit is mapped to standard General MIDI note numbers.
| Note # | Drum Pad  |
|--------|-----------|
| 36     | Kick      |
| 38     | Snare     |
| 46     | Hi-Hat    |
| 45–50  | Toms      |
| 49, 57 | Crashes   |
| 51     | Ride      |

# 💻 Requirements
- A MIDI-compatible device
- A modern browser supporting the Web MIDI API (with flags enabled)


#
(Tested on: BlackHawk HXD 4 PRO)