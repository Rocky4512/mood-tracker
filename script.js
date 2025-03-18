// Select all mood buttons
const moodButtons = document.querySelectorAll('.mood-btn');

// Select the mood history container where moods will be displayed
const moodHistory = document.querySelector('#mood-history');

// Load stored moods from localStorage when the page loads
window.addEventListener("load", () => {
    const savedMoods = JSON.parse(localStorage.getItem('moods')) || []; // Retrieve stored moods or set an empty array
    savedMoods.forEach(entry => displayMood(entry.mood, entry.time)); // Display each stored mood
});

// Add event listener to each mood button
moodButtons.forEach(button => {
    button.addEventListener("click", () => {
        const timestamp = new Date().toLocaleString(); // Get current date and time
        const mood = button.textContent; // Get the text of the clicked button (mood)

        saveMood(mood, timestamp); // Save mood to localStorage
        displayMood(mood, timestamp); // Display mood in the UI
    });
});

// Function to save the mood in localStorage
function saveMood(mood, timestamp) {
    let moods = JSON.parse(localStorage.getItem('moods')) || []; // Retrieve stored moods or set an empty array
    moods.push({ mood, time: timestamp }); // Add new mood to the array
    localStorage.setItem('moods', JSON.stringify(moods)); // Store updated moods back into localStorage
}

// Function to display mood in the UI
function displayMood(mood, timestamp) {
    const moodEntry = document.createElement('div'); // Create a new div element
    moodEntry.classList.add('mood-entry'); // Add CSS class to the div

    const moodText = document.createElement('p'); // Create a paragraph for the mood text
    moodText.textContent = mood; // Set text content to the mood

    const moodTimestamp = document.createElement('p'); // Create a paragraph for the timestamp
    moodTimestamp.textContent = `Logged at: ${timestamp}`; // Set timestamp text
    moodTimestamp.classList.add('timestamp'); // Add CSS class for styling

    const editButton = document.createElement('button'); // Create an edit button
    editButton.textContent = "Edit"; // Set button text
    editButton.classList.add('edit-btn'); // Add CSS class for styling

    // Add event listener to the edit button
    editButton.addEventListener("click", () => {
        const newMood = prompt("Edit your mood:", moodText.textContent); // Ask user for new mood
        if (newMood) {
            moodText.textContent = newMood; // Update mood text
            updateMoodInLocalStorage(mood, newMood, timestamp); // Update localStorage
        }
    });

    const deleteButton = document.createElement('button'); // Create a delete button
    deleteButton.textContent = "Delete"; // Set button text
    deleteButton.classList.add('delete-btn'); // Add CSS class for styling

    // Add event listener to the delete button
    deleteButton.addEventListener("click", () => {
        moodEntry.remove(); // Remove mood entry from UI
        deleteMoodFromLocalStorage(mood, timestamp); // Remove mood from localStorage
    });

    // Append elements to the mood entry
    moodEntry.appendChild(moodText);
    moodEntry.appendChild(moodTimestamp);
    moodEntry.appendChild(editButton);
    moodEntry.appendChild(deleteButton);

    // Append mood entry to mood history container
    moodHistory.appendChild(moodEntry);
}

// Function to update a mood in localStorage after editing
function updateMoodInLocalStorage(oldMood, newMood, timestamp) {
    let moods = JSON.parse(localStorage.getItem('moods')) || []; // Retrieve stored moods or set an empty array
    const moodIndex = moods.findIndex(entry => entry.mood === oldMood && entry.time === timestamp); // Find the mood to edit

    if (moodIndex !== -1) { // If mood is found
        moods[moodIndex].mood = newMood; // Update mood text
        localStorage.setItem('moods', JSON.stringify(moods)); // Store updated moods back into localStorage
    }
}

// Function to delete a mood from localStorage
function deleteMoodFromLocalStorage(mood, timestamp) {
    let moods = JSON.parse(localStorage.getItem('moods')) || []; // Retrieve stored moods or set an empty array
    moods = moods.filter(entry => !(entry.mood === mood && entry.time === timestamp)); // Remove the selected mood
    localStorage.setItem('moods', JSON.stringify(moods)); // Store updated moods back into localStorage
}
