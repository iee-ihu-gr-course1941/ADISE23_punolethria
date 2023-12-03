function signUp() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var passwordRepeat = document.getElementById("passwordRepeat").value;

    if (username === "" || password === "" || passwordRepeat === "") {
        window.alert("Please fill in all fields.");
        return false;
    }
    document.getElementById('signupForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
}

function cancelSignUp(){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var passwordRepeat = document.getElementById("passwordRepeat").value;
    
    username = "";
    password = "";
    passwordRepeat = "";
}

function showSignupForm() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'block';
}

var signUpButton = document.getElementById("signUpbt");
var cancelSignUpButton = document.getElementById("cancelSignUpbt");
var cancelLoginButton = document.getElementById("cancelLoginbt");
 

signUpButton.addEventListener("click",signUp);
cancelSignUpButton.addEventListener("click",cancelSignUp);
cancelLoginButton.addEventListener("click",showSignupForm);
