function signUp() {
    var username = document.getElementById("signUpusername").value;
    var password = document.getElementById("signUpPassword").value;
    var passwordRepeat = document.getElementById("signUpPasswordRepeat").value;

    if (username === "" || password === "" || passwordRepeat === "") {
        window.alert("Please fill in all fields.");
        return false;
    }

    //JSON antikeimeno
    var data = {
        playerUsername: username,
        playerPassword: password,
        playerPasswordRepeat: passwordRepeat
    };

    $.ajax({
        type: 'POST',
        url: '../PHP/signUp.php', 
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (response) {
            // Handle success response
            alert(response.message);
        },
        error: function (error) {
            // Handle error response
            alert('Error: ' + error.responseText);
        }
    });


    var loginUsername = document.getElementById("loginUsername") ;
    var loginPassword = document.getElementById("loginPassword") ;

    loginUsername.value = "";
    loginPassword.value = "";
    
    document.getElementById('signupForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
}

function cancelSignUp(){
    var username = document.getElementById("signUpusername");
    var password = document.getElementById("signUpPassword");
    var passwordRepeat = document.getElementById("signUpPasswordRepeat");
    
    username.value  = "";
    password.value  = "";
    passwordRepeat.value  = "";
}

function showSignupForm() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'block';
    document.getElementById("signInQuestion").style.display = 'block';
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
    document.getElementById("signInQuestion").style.display = 'none';
}
