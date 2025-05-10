import React, { useEffect, useState } from 'react';
import { initializeMIDI } from './midi/index';
import './styles/index.css';

// Import SVG files
const kickSvg = "/images/kick.svg";
const snareSvg = "/images/snare.svg";
const hihatSvg = "/images/hihat.svg";
const tomSvg = "/images/tom.svg";
const crashSvg = "/images/crash.svg";
const rideSvg = "/images/ride.svg";

// Define drum types with their properties
const DRUMS = [
    { id: 'kick', name: 'Kick', image: kickSvg },
    { id: 'snare', name: 'Snare', image: snareSvg },
    { id: 'hihat', name: 'Hihat', image: hihatSvg },
    { id: 'tom1', name: 'Tom 1', image: tomSvg },
    { id: 'tom2', name: 'Tom 2', image: tomSvg },
    { id: 'tom3', name: 'Tom 3', image: tomSvg },
    { id: 'tom4', name: 'Tom 4', image: tomSvg },
    { id: 'crash1', name: 'Crash 1', image: crashSvg },
    { id: 'crash2', name: 'Crash 2', image: crashSvg },
    { id: 'ride', name: 'Ride', image: rideSvg }
];

function App() {
    useEffect(() => {
        setTimeout(() => {
            initializeMIDI();
        }, 100);
    }, []); // [] - runs only once after the component mounts

    const clearMidiLog = () => {
        const midiLog = document.getElementById('midi-log');
        if (midiLog) {
            midiLog.textContent = "Waiting for MIDI input...";
        }
    };

    return (
        <div className="App">
            <h1>Drum Visualizer</h1>
            <div id="drum-container">
                {DRUMS.map((drum) => (
                    <div key={drum.id} className="drum" id={drum.id}>
                        <img src={drum.image} alt={drum.name} className="drum-image" />
                    </div>
                ))}
            </div>
            <div className="log-container">
                <pre id="midi-log">Waiting for MIDI input...</pre>
                <button className="clear-log-btn" onClick={clearMidiLog}>Clear Log</button>
            </div>
        </div>
    );
}

export default App;
