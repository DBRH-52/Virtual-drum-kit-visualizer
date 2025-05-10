import { DRUM_MAPPING, BLACKHAWK_HXD4_PRO_MAPPING, MIDI_COMMANDS } from './constants';

// Default to standard General MIDI mapping
let currentMapping = DRUM_MAPPING;

export function setMappingType(mappingType) {
    if (mappingType === 'blackhawk') {
        currentMapping = BLACKHAWK_HXD4_PRO_MAPPING;
        console.log('Switched to Blackhawk HXD4 PRO mapping');
    } else {
        currentMapping = DRUM_MAPPING;
        console.log('Switched to General MIDI mapping');
    }
}

export function initializeMIDI() {
    if (navigator.requestMIDIAccess) {
        navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
    }
    else {
        document.getElementById('midi-log').textContent = "Web MIDI is not supported in this browser!";
    }
}

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


//(extract command, note, velocity from MIDI message)
function handleMIDIMessage(message) {
    console.log("MIDI message received!"); 
    // (MIDI message = 3 bytes)
    // (first byte - command -- 144=note on/128=note off, control change + channel number)
    // (second byte - note number -- 0-127)
    // (third byte - velocity -- how hard the note is hit - 0-127)
    const [command, note, velocity] = message.data;
    
    console.log("MIDI data:", command, note, velocity);
    document.getElementById('midi-log').textContent += `\nMIDI Message: Command=${command}, Note=${note}, Velocity=${velocity}`;
    
    // Process note-on messages
    // (153 (0x99 hex) = 144 (0x90 hex) + 9 (channel 10)) --> (153 = note-on on channel 10)
    // With velocity > 0 --> (0 - note-off msg)
    //if ((command === 144 || command === 153) && velocity > 0) {

    // (0x90 = 1001 0000 in binary - first 4 bits - 1001 - note-on)
    // (0xF0 = 1111 0000 in binary - mask to check only first 4 bits)
    //if ((command & 0xF0) === 0x90 && velocity > 0) {
    
    // Check if this is a note-on message with velocity > 0 (actual drum hit, not release)
    if ((command & MIDI_COMMANDS.COMMAND_MASK) === MIDI_COMMANDS.NOTE_ON && velocity > 0) {
        const drumElement = document.getElementById(currentMapping[note]);
        const drumName = currentMapping[note] || 'unknown';
        
        console.log(`Trying to highlight: Note=${note} (${drumName}), Mapped to=${currentMapping[note]}, Element found=${!!drumElement}`);
        document.getElementById('midi-log').textContent += `\nTrying to highlight: Note=${note} (${drumName}), Mapped to=${currentMapping[note]}, Element found=${!!drumElement}`;
        
        if (drumElement) {
            // Visual feedback for the drum hit
            // Calculate the zoom scale based on velocity (0-quiet | 127-loud)
            // The harder the hit, the more the drum will scale up
            const scale = 1 + (velocity / 127) * 0.5;
            
            // Add hit class and set scale based on velocity -- trigger css effects for visual feedback
            drumElement.classList.add('hit');
            
            //
            const computedStyle = window.getComputedStyle(drumElement);
            const currentTransform = computedStyle.transform;
            
            // If the transform is none or the identity matrix -> handle positioning transforms
            if (currentTransform === 'none' || currentTransform === 'matrix(1, 0, 0, 1, 0, 0)') {
                // Get the id to determine if it uses translateX(-50%) or translateX(50%)
                const id = drumElement.id;
                if (id === 'ride') {
                    // Ride uses translateX(50%)
                    drumElement.style.transform = `translateX(50%) scale(${scale})`;
                } else {
                    // All others use translateX(-50%)
                    drumElement.style.transform = `translateX(-50%) scale(${scale})`;
                }
            } else {
                // If there's already a transform matrix -> apply scale while preserving position
                drumElement.style.transform = `${currentTransform} scale(${scale})`;
            }

            // Return to previous state after 100ms
            // Create a short "hit" animation effect
            setTimeout(() => {
                drumElement.classList.remove('hit');
                // Restore the original transform based on ID
                const id = drumElement.id;
                if (id === 'ride') {
                    drumElement.style.transform = 'translateX(50%)';
                } else {
                    drumElement.style.transform = 'translateX(-50%)';
                }
            }, 100);
        }
    }
}