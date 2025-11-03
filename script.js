// The public URL for your deployed Magic 8-Ball API endpoint
const API_URL = 'https://magic-8-ball-1abf.onrender.com/ask_8_ball';

/**
 * Handles the user interaction, makes the API call, and updates the UI.
 */
async function askEightBall() {
    // 1. Get DOM elements
    const questionInput = document.getElementById('question-input');
    const answerDisplay = document.getElementById('answer-text');
    const errorDisplay = document.getElementById('error-display');
    const shakeButton = document.getElementById('shake-button');
    
    // Clear previous error message and validate input
    errorDisplay.textContent = '';
    const userQuestion = questionInput.value.trim();

    if (!userQuestion) {
        answerDisplay.textContent = "Please ask a question!";
        return;
    }

    // 2. Prepare UI
    answerDisplay.textContent = "Shaking...";
    shakeButton.disabled = true;

    try {
        // 3. Fetch data from the live API
        const response = await fetch(API_URL, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                'question': userQuestion
            })
        });

        if (!response.ok) {
            // Throw a concise error if the HTTP status is not 200 (OK)
            throw new Error(`Server responded with HTTP status ${response.status}.`);
        }

        const data = await response.json(); 
        
        // 4. Display the answer
        answerDisplay.textContent = data.magic_answer;

    } catch (error) {
        // 5. Handle and display errors
        console.error('API Call Failed:', error);
        errorDisplay.textContent = `Error: Could not connect to the API. ${error.message}`;
        answerDisplay.textContent = "Error!";
    } finally {
        // 6. Final UI state reset
        shakeButton.disabled = false;
    }
}