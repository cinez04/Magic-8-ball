from flask import Flask, jsonify, request
import random
from flask_cors import CORS 

# The Flask application instance is named 'app'
app = Flask(__name__)
CORS(app) # Enables cross-origin requests

# The core 8-Ball logic, now as a function
def get_magic_answer():
    magic = random.randint(1, 9)
    
    if magic == 1:
        return "Yes - definitely."
    elif magic == 2:
        return "It is decidedly so."
    elif magic == 3:
        return "Without a doubt."
    elif magic == 4:
        return "Reply hazy, try again."
    elif magic == 5:
        return "Ask again later."
    elif magic == 6:
        return "Better not tell you now."
    elif magic == 7:
        return "Very doubtful."
    elif magic == 8:
        return "My sources say no."
    elif magic == 9:
        return "Outlook not so good."
    return "Error!"

# This is the API endpoint your frontend will call (POST request to the root URL)
@app.route('/', methods=['POST'])
def ask_8_ball():
    # Get the answer
    answer = get_magic_answer()
    
    # Send the answer back to the frontend as a JSON object
    return jsonify({
        'question_received': 'OK',
        'magic_answer': answer
    })

# NOTE: The development block (if __name__ == '__main__': app.run(debug=True))
# is intentionally omitted because Gunicorn handles the startup.