
$(function(){
    var signUpButton = document.getElementById("signUpbt");
    signUpButton.addEventListener('click',signUp); 
    var cancelSignUpButton = document.getElementById("cancelSignUpbt");
    var cancelLoginButton = document.getElementById("cancelLoginbt");
    cancelSignUpButton.addEventListener('click',cancelSignUp);
    cancelLoginButton.addEventListener('click',showSignupForm);
})






function signUp() {
    var username = document.getElementById("signUpusername").value;
    var password = document.getElementById("signUpPassword").value;
    var passwordRepeat = document.getElementById("signUpPasswordRepeat").value;

    if (username === "" || password === "" || passwordRepeat === "") {
        window.alert("Please fill in all fields.");
        return false;
    }
    if(password != passwordRepeat){
        window.alert("Passwords do not match!")
        return false;
    }
    

    //JSON antikeimeno
    var data = {
        playerUsername: username,
        playerPassword: password,
        playerPasswordRepeat: passwordRepeat
    };

    $.ajax({
        url: 'PHP/signUp.php',
        method: 'POST',
        datatype: 'json',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: signUpResult,
        error:signUpError});


    function signUpResult(){
        $('#signUpForm').hide();
        $('#loginForm').show();

    }

    function signUpError(data){
        var x = data.responseJSON;
	    alert(x.errormesg);
    }

    //signUpButton.addEventListener('click',signUp);

    var loginUsername = document.getElementById("loginUsername") ;
    var loginPassword = document.getElementById("loginPassword") ;

    loginUsername.value = "";
    loginPassword.value = "";
    
   
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



function logIn() {
    document.getElementById('signupForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById("signInQuestion").style.display = 'none';
}
