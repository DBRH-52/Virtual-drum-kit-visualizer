// MIDI note mapping
// (standard general MIDI drum note numbers)
const DRUM_MAPPING = {
    36: 'kick',    
    46: 'hihat',   
    38: 'snare',   
    45: 'tom1',    
    47: 'tom2',    
    48: 'tom3',    
    50: 'tom4',    
    49: 'crash1',  
    57: 'crash2',  
    51: 'ride'     
};

// Loop through all available MIDI input devices
function onMIDISuccess(midiAccess) {
    const inputs = midiAccess.inputs.values();
    for (let input of inputs) {
        // Log the connected MIDI input device name
        document.getElementById('midi-log').textContent += '\nConnected to: ' + input.name;
        // Set up an event handler to process incoming MIDI messages from that device
        input.onmidimessage = handleMIDIMessage;
    }
}
function onMIDIFailure() {
    document.getElementById('midi-log').textContent = 'Failed to connect to MIDI devices.';
}

// Handle incoming MIDI messages
function handleMIDIMessage(message) {
    console.log("MIDI message received!"); 
    // (MIDI message = 3 bytes)
    // (first byte - command -- 144=note on/128=note off, control change + channel number)
    // (second byte - note number -- 0-127)
    // (third byte - velocity -- how hard the note is hit - 0-127)
    const [command, note, velocity] = message.data;
    console.log("MIDI data:", command, note, velocity);  // Log the raw data
    document.getElementById('midi-log').textContent += `\nMIDI Message: Command=${command}, Note=${note}, Velocity=${velocity}`;
    // Process note-on messages
    // (153 (0x99 hex) = 144 (0x90 hex) + 9 (channel 10)) --> (153 = note-on on channel 10)
    // With velocity > 0 --> (0 - note-off msg)
    //if ((command === 144 || command === 153) && velocity > 0) {

    // (0x90 = 1001 0000 in binary - first 4 bits - 1001 - note-on)
    // (0xF0 = 1111 0000 in binary - mask to check only first 4 bits)
    if ((command & 0xF0) === 0x90 && velocity > 0) {
        const drumElement = document.getElementById(DRUM_MAPPING[note]);
        const drumName = DRUM_MAPPING[note] || 'unknown';
        console.log(`Trying to highlight: Note=${note} (${drumName}), Mapped to=${DRUM_MAPPING[note]}, Element found=${!!drumElement}`);
        document.getElementById('midi-log').textContent += `\nTrying to highlight: Note=${note} (${drumName}), Mapped to=${DRUM_MAPPING[note]}, Element found=${!!drumElement}`;
        if (drumElement) {
            // Visual feedback
            // Calculate the zoom scale based on velocity (0-quite | 127-loud))
            // Scaling: 1.0 (velocity=0 - very quiet) - 1.5 (velocity=127 - very loud)
            // 1.0 - 100% size | 1.5 - 150% size
                // velocity / 127 -> calculate % of hit
                // * 0.5 -> max zoom = 50%
                // 1 + -> size - always at least 100%
            const scale = 1 + (velocity / 127) * 0.5;
            // W/o changing the layout
            drumElement.style.transform = `scale(${scale})`;
            drumElement.style.backgroundColor = 'orange';

            // Return to previous state after 100ms
            setTimeout(() => {
                drumElement.style.transform = 'scale(1)';
                drumElement.style.backgroundColor = '';
            }, 100);
        }
    }
}

// Initialize MIDI access
if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
} else {
    document.getElementById('midi-log').textContent = 'Web MIDI is not supported in this browser.';
} 