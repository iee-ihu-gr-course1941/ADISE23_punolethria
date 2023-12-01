function showLoginForm() {
    document.getElementById('signupForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
}

function showSignupForm() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'block';
}

var signUpButton = document.getElementById("signUpbt")
var cancelLoginButton = document.getElementById("cancelLoginbt")

signUpButton.addEventListener("click",showLoginForm)
cancelLoginButton.addEventListener("click",showSignupForm)