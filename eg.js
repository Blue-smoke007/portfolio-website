window.onload = function () {
    // Get the current hour of the day
    const currentHour = new Date().getHours();
    const greetingText = document.getElementById('greeting');
    const logoContainer = document.getElementById('logo'); // Select the logo element

    // Define greeting messages and background colors based on the time of day
    let greetingMessage = '';
    let backgroundColor = '';

    // Morning: 5AM - 11:59AM
    if (currentHour >= 5 && currentHour < 12) {
        greetingMessage = 'Good Morning, Freelancer!';
        backgroundColor = '#FFFACD'; // Morning color (pale yellow)
        textColor = '#000000'; // Black text
    }
    // Afternoon: 12PM - 5:59PM
    else if (currentHour >= 12 && currentHour < 18) {
        greetingMessage = 'Good Afternoon, Freelancer!';
        backgroundColor = '#87CEEB'; // Afternoon color (sky blue)
        textColor = '#000000'; // Black text
    }
    // Evening: 6PM - 4:59AM
    else {
        greetingMessage = 'Good Evening, Freelancer!';
        backgroundColor = '#2C3E50'; // Evening color (Midnight blue)
        textColor = '#FFFFFF';
    }


    // Set the background color of the page
    document.body.style.backgroundColor = backgroundColor;

    // Set the background color of the logo
    if (logoContainer) {
        logoContainer.style.backgroundColor = backgroundColor;
    }

    // Display the greeting message in a styled custom alert box
    setTimeout(function () {
        alertGreeting(greetingMessage);
    }, 500); // Small delay for smoother user experience
};

// Function to create and display a styled alert box
function alertGreeting(message) {
    const alertBox = document.createElement('div');
    alertBox.style.position = 'fixed';
    alertBox.style.top = '25%';
    alertBox.style.left = '50%';
    alertBox.style.transform = 'translate(-50%, -50%)';
    alertBox.style.padding = '20px';
    alertBox.style.backgroundColor = 'black';
    alertBox.style.color = 'white';
    alertBox.style.borderRadius = '70px';
    alertBox.style.boxShadow = '0 0 15px rgba(0, 0, 0, 0.2)';
    alertBox.style.fontSize = '15px';
    alertBox.style.fontWeight = 'lighter';
    alertBox.style.fontFamily = 'sans-serif';
    alertBox.style.textAlign = 'center';
    alertBox.innerText = message;

    document.body.appendChild(alertBox);

    // Remove the alert box after 3 seconds
    setTimeout(() => {
        alertBox.remove();
    }, 3000);
}
