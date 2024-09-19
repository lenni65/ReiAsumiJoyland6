document.addEventListener('DOMContentLoaded', () => {
    const dialogueBox = document.getElementById('dialogue-box');
    const dialogueText = document.getElementById('dialogue-text');
    const nameBox = document.getElementById('name-box');
    const characterImageContainer = document.querySelector('.character-image-container');
    const dialogueLines = dialogueText.querySelectorAll('.dialogue-line');
    const backgroundImage = document.getElementById('background-image');
    const transitionBackground = document.getElementById('transition-background');
    const musicNote = document.getElementById('music-note');
    const transitionSound = new Audio('https://od.lk/s/ODZfNjU2NjI3NzBf/main-door-opening-closing-38280%20%281%29.mp3');
    const backgroundMusic = new Audio('https://od.lk/s/ODZfNjU2NjI3Njlf/rock-music-6211%20%281%29.mp3');

    let currentLineIndex = 0;
    let typing = false;
    let typingTimeout;
    let backgroundTransitioned = false; // Ensure background transition happens only once

    // Define an array of names to switch between based on the dialogue
    const names = ["...", "...", "Rei Asumi", "...", "..."];

    // Function to reset the dialogue box before displaying new content
    function resetDialogue() {
        dialogueText.innerHTML = ''; // Clear the text content
    }

    // Function to animate the text character by character
    function typewriterEffect(text) {
        let charIndex = 0;
        typing = true; // Set typing flag to true

        function revealCharacter() {
            if (charIndex < text.length) {
                dialogueText.innerHTML += text[charIndex]; // Append each character
                charIndex++;
                typingTimeout = setTimeout(revealCharacter, 30); // Adjust typing speed here
            } else {
                typing = false; // Typing completed
            }
        }

        revealCharacter(); // Start revealing characters
    }

    // Function to display the current line of dialogue
    function displayCurrentLine() {
        if (currentLineIndex >= dialogueLines.length) {
            return; // No more lines to display
        }

        const currentLine = dialogueLines[currentLineIndex];
        const lineText = currentLine.textContent.trim(); // Get the current dialogue text
        const currentName = names[currentLineIndex]; // Get the current name

        // Update the name box
        nameBox.textContent = currentName;

        // Clear previous text and start typing the new line
        resetDialogue();
        typewriterEffect(lineText);

        // Slide and fade in the character image when the name is "Rei Asumi"
        if (currentName === "Rei Asumi") {
            characterImageContainer.classList.add('show');
        }

        // Check if this is the last line of dialogue
        if (currentLineIndex === dialogueLines.length - 1) {
            // Add the faded class to make the character go transparent
            characterImageContainer.classList.add('faded');
        }

        // Check if the data-line attribute of the current line is "3" and trigger background transition
        if (currentLine.getAttribute('data-line') === '3' && !backgroundTransitioned) {
            console.log("Dialogue line with data-line='3' reached. Triggering background transition...");
            handleBackgroundTransition();
        }
    }

    // Function to handle the background transition
    function handleBackgroundTransition() {
        if (backgroundTransitioned) return; // Prevent multiple transitions

        backgroundTransitioned = true; // Mark that the background transition has occurred

        // Play transition sound
        transitionSound.play();

        // Debugging: Log the transition sound being played
        console.log("Transition sound playing...");

        // Fade in the transition background
        transitionBackground.style.opacity = 1;

        // Wait for the fade-in to complete before updating the main background image
        setTimeout(() => {
            // Change the background image
            backgroundImage.src = 'https://i.imgur.com/oIxgax7.png'; // Ensure the URL is correct
            // Transition background will stay visible
        }, 1000); // Match this timeout to the CSS transition time
    }

    // Function to go to the next dialogue line when clicking on the dialogue box
    function nextLine() {
        if (typing) {
            // If typing is still happening, stop the timeout and reveal all text instantly
            clearTimeout(typingTimeout);
            dialogueText.innerHTML = dialogueLines[currentLineIndex].textContent.trim(); // Instantly show the full text
            typing = false; // Reset typing flag
            return;
        }

        // Move to the next dialogue line
        currentLineIndex++;

        // Display the next line of dialogue
        displayCurrentLine();
    }

    // Initialize the first line of dialogue
    displayCurrentLine();

    // Add event listener to go to the next line on click
    dialogueBox.addEventListener('click', nextLine);

    // Music note click event
    musicNote.addEventListener('click', () => {
        if (backgroundMusic.paused) {
            backgroundMusic.play(); // Play the music if it's paused
        } else {
            backgroundMusic.pause(); // Pause the music if it's already playing
        }
    });
});