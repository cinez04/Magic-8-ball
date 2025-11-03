// Function that runs when the "Shake the Ball" button is clicked
async function askEightBall() {
    // 1. Get DOM elements
    const questionInput = document.getElementById('question-input');
    const answerDisplay = document.getElementById('answer-text');
    const errorDisplay = document.getElementById('error-display');
    const shakeButton = document.getElementById('shake-button');
    
    // Clear previous error message
    errorDisplay.textContent = '';
    
    // Check if the user entered a question
    if (questionInput.value.trim() === "") {
        answerDisplay.textContent = "Please ask a question!";
        return;
    }

    // 2. Prepare the UI for interaction
    const userQuestion = questionInput.value;
    answerDisplay.textContent = "Shaking...";
    shakeButton.disabled = true; // Disable button during API call

    // 3. Define the URL of your Flask endpoint
    // IMPORTANT: Ensure your Flask server is running at this address!
    const API_URL = 'http://127.0.0.1:5000/ask_8_ball';

    try {
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
            // Handle HTTP errors (e.g., 404, 500)
            throw new Error(`Server responded with status: ${response.status}. Is your Flask server running?`);
        }

        const data = await response.json(); 
        
        // 4. Get the answer from the JSON response and update the display
        const answer = data.magic_answer;
        answerDisplay.textContent = answer;

    } catch (error) {
        // Handle network errors (e.g., Flask server is down)
        console.error('API Call Error:', error);
        errorDisplay.textContent = `Error: Could not connect to the API. ${error.message}`;
        answerDisplay.textContent = "Error!";
    } finally {
        // Re-enable the button after the call is complete
        shakeButton.disabled = false;
    }
}