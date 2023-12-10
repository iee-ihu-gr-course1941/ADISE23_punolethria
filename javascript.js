function signUp() {
    var username = document.getElementById("signUpusername").value;
    var password = document.getElementById("signUppassword").value;
    var passwordRepeat = document.getElementById("signUppasswordRepeat").value;

    if (username === "" || password === "" || passwordRepeat === "") {
        window.alert("Please fill in all fields.");
        return false;
    }
    var loginUsername = document.getElementById("loginUsername") ;
    var loginPassword = document.getElementById("loginPassword") ;

    loginUsername.value = "";
    loginPassword.value = "";
    
    document.getElementById('signupForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
}

function cancelSignUp(){
    var username = document.getElementById("signUpusername") ;
    var password = document.getElementById("signUppassword") ;
    var passwordRepeat = document.getElementById("signUppasswordRepeat") ;
    
    username.value  = "";
    password.value  = "";
    passwordRepeat.value  = "";
}

function showSignupForm() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'block';
}

var signUpButton = document.getElementById("signUpbt");
var cancelSignUpButton = document.getElementById("cancelSignUpbt");
var cancelLoginButton = document.getElementById("cancelLoginbt");
 

signUpButton.addEventListener('click',signUp);
cancelSignUpButton.addEventListener('click',cancelSignUp);
cancelLoginButton.addEventListener('click',showSignupForm);

function logIn() {
    document.getElementById('signupForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
}
