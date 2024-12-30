// Hardcoded credentials for validation
 const correctUsername = "bluesmoke";
 const correctPassword = "111";

// Simulate logging activity
function logActivity(username, status) {
console.log(`User "${username}" login attempt was a ${status}`);
}

// Login button click handler
document.getElementById("loginButton").addEventListener("click", function () {
const username = document.getElementById("username").value;
const password = document.getElementById("password").value;

const errorMessage = document.getElementById("errorMessage");
const successMessage = document.getElementById("successMessage");

// Check credentials
const isLoginSuccessful = username === correctUsername && password === correctPassword;

if (isLoginSuccessful) {
errorMessage.style.display = "none";
successMessage.style.display = "block";

logActivity(username, "success");

// Redirect after success
setTimeout(() => {
window.location.href = "homepage.html";
}, 1000);
} else {
successMessage.style.display = "none";
errorMessage.style.display = "block";

logActivity(username, "failure");
}
});



