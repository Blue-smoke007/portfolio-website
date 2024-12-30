const chatWindow = document.getElementById('chat-window');
const userInput = document.getElementById('user-input');

// Predefined responses for portfolio context
const portfolioResponses = {
    greetings: [
        "Hello! I'm the BLUE AI Assistant. I can help you learn more about this portfolio.",
        "Hi there! Ready to explore the portfolio? Ask me anything.",
        "Welcome! I'm here to provide insights about the portfolio."
    ],
    noUnderstand: [
        "I'm not quite sure I understand. Could you rephrase that?",
        "That's a bit unclear. Can you ask something more specific about the portfolio?",
        "I'm designed to help with portfolio-related questions. Could you be more specific?"
    ],
    about: [
        "BLUE is a comprehensive portfolio showcasing innovative projects and professional expertise.",
        "This portfolio represents a collection of professional achievements and technical skills.",
        "BLUE demonstrates a commitment to cutting-edge solutions and creative problem-solving."
    ],
    projects: [
        "The portfolio features a range of projects highlighting technical proficiency and innovative thinking.",
        "Each project is carefully selected to demonstrate problem-solving skills and technical expertise.",
        "The projects showcase a diverse range of technologies and creative solutions."
    ]
};

function addMessage(text, isUser) {
    const message = document.createElement('div');
    message.className = `message ${isUser ? 'user' : 'bot'}`;
    message.textContent = text;
    chatWindow.appendChild(message);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function getAIResponse(userText) {
    const lowerText = userText.toLowerCase();

    // Greeting responses
    if (['hi', 'hello', 'hey', 'sup'].some(greeting => lowerText.includes(greeting))) {
        return portfolioResponses.greetings[Math.floor(Math.random() * portfolioResponses.greetings.length)];
    }

    // About responses
    if (lowerText.includes('about') || lowerText.includes('who')) {
        return portfolioResponses.about[Math.floor(Math.random() * portfolioResponses.about.length)];
    }

    // Project responses
    if (lowerText.includes('project') || lowerText.includes('work')) {
        return portfolioResponses.projects[Math.floor(Math.random() * portfolioResponses.projects.length)];
    }

    // Default fallback
    return portfolioResponses.noUnderstand[Math.floor(Math.random() * portfolioResponses.noUnderstand.length)];
}

function simulateTyping(response) {
    return new Promise(resolve => {
        addMessage('...', false);
        setTimeout(() => {
            chatWindow.removeChild(chatWindow.lastChild);
            addMessage(response, false);
            resolve();
        }, 1000);
    });
}

async function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    // Add user message
    addMessage(text, true);
    userInput.value = '';

    // Get AI response
    const aiResponse = getAIResponse(text);
    
    // Simulate typing and response
    await simulateTyping(aiResponse);
}

// Add event listener for Enter key
userInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

// Initial greeting
addMessage(portfolioResponses.greetings[0], false);