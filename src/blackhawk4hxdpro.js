// Get the drum toggle button and BlackHawk drum image container
const drumToggleButton = document.getElementById('show-drums-toggle-button');
const drumImageContainer = document.getElementById('drum-image-container');

// Event listener to toggle the drum image visibiliy when the button is clickedd 
drumToggleButton.addEventListener('click', function() {
    if (drumImageContainer.style.display === 'none' || drumImageContainer.style.display === '') {
        drumImageContainer.style.display = 'block'; // Show the drum image container
    }
    else {
        drumImageContainer.style.display = 'none'; // Hide the drmum image container
    }
})