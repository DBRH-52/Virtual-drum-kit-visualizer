// MIDI note mapping
// (standard general MIDI drum note numbers)
const DRUM_MAPPING = {
    36: 'kick',    
    42: 'hihat',   
    38: 'snare',   
    45: 'tom1',    
    47: 'tom2',    
    48: 'tom3',    
    50: 'tom4',    
    49: 'crash1',  
    57: 'crash2',  
    51: 'ride'     
};

function onMIDISuccess(midiAccess) {
    const inputs = midiAccess.inputs.values();
    for (let input of inputs) {
        document.getElementById('midi-log').textContent += '\nConnected to: ' + input.name;
        input.onmidimessage = handleMIDIMessage;
    }
}

function onMIDIFailure() {
    document.getElementById('midi-log').textContent = 'Failed to connect to MIDI devices.';
}

function handleMIDIMessage(message) {
    const [command, note, velocity] = message.data;
    document.getElementById('midi-log').textContent += `\nMIDI Message: Command=${command}, Note=${note}, Velocity=${velocity}`;
    
    // Process note-on messages 
    // (153 = 0x99hex - note on -> 153 = 144 (base note-on) + 9 (channel 10)) 
    // With velocity > 0 
    // (0 - note-off msg; in MIDI velocity is between 0 and 127 = how hard the note is hit)
    if (command === 153 && velocity > 0) {
        const drumElement = document.getElementById(DRUM_MAPPING[note]);
        if (drumElement) {
            // Visual feedback
            drumElement.style.backgroundColor = 'red';
            setTimeout(() => {
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