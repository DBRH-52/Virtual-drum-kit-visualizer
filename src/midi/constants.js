// MIDI note mapping -- (standard general MIDI drum note numbers)
export const DRUM_MAPPING = {
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

// BlackHawk HXD4 PRO drum mapping
export const BLACKHAWK_HXD4_PRO_MAPPING = {
    36: 'kick',    
    46: 'hihat',   
    38: 'snare',   
    48: 'tom1',    
    45: 'tom2',    
    47: 'tom3',    
    43: 'tom4',    
    49: 'crash1',  
    55: 'crash2',  
    51: 'ride'     
};

// MIDI command constants
export const MIDI_COMMANDS = {
    NOTE_ON: 0x90,
    NOTE_OFF: 0x80,
    COMMAND_MASK: 0xF0
};