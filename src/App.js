import React, { useEffect, useRef } from 'react';
import {initializeMIDI} from './midi';
//import './App.css';
import './style.css';

const DRUMS = [
    'kick',
    'snare',
    'hihat',
    'tom1',
    'tom2',
    'tom3',
    'tom4',
    'crash1',
    'crash2',
    'ride'
];

function App() {
    useEffect(() => {
        setTimeout(() => {
            initializeMIDI();
        }, 100);
    }, []); // [] - runs only once after the component mounts

    return (
        <div className="App">
            <h1>Drum Visualizer</h1>
            <div id="drum-container">
                {/* Iterate over the DRUMS array */}
                {DRUMS.map((drum) => (
                    <div key={drum} className="drum" id={drum}>
                        {/* Display the drum name in more readable format */}
                        {drum.replace(/([a-z])([A-Z])/g, '$1 $2')}
                    </div>
                ))}
            </div>
            <pre id="midi-log">Waiting for MIDI input...</pre>
        </div>
    );
}

export default App;
