$(function () {
  var signUpButton = document.getElementById("signUpbt");
  var cancelSignUpButton = document.getElementById("cancelSignUpbt");

  var logInButton = document.getElementById("logInBtn");
  var cancelLoginButton = document.getElementById("cancelLoginbt");

  signUpButton.addEventListener("click", signUp);
  cancelSignUpButton.addEventListener("click", cancelSignUp);
  logInButton.addEventListener("click", logIn);
  cancelLoginButton.addEventListener("click", showSignupForm);
});


function selectedTag(){
    var selectedValue = document.getElementById("dropdownOptions").value;

        // Display the selected value (you can replace this with your own logic)
        if (selectedValue === "option1") {
            return "friend";
        } else if (selectedValue === "option2") {
            return "hostile";
        }

}

function signUp() {
  var username = document.getElementById("signUpusername").value;
  var password = document.getElementById("signUpPassword").value;
  var passwordRepeat = document.getElementById("signUpPasswordRepeat").value;
  var tagName = selectedTag();
  setToken();
  var token = getToken();

  if (username === "" || password === "" || passwordRepeat === "") {
    window.alert("Please fill in all fields.");
    return false;
  }
  if (password != passwordRepeat) {
    window.alert("Passwords do not match!");
    return false;
  }

  //JSON antikeimeno
  var signUpdata = {
    playerTag: tagName,
    playerUsername: username,
    playerPassword: password,
    playerPasswordRepeat: passwordRepeat,
    playerToken: token,
  };

  $.ajax({
    url: "PHP/signUp.php",
    method: "POST",
    dataType: "json",
    data: JSON.stringify(signUpdata),
    contentType: "application/json",
    success: function (response) {
      successMessage = response.message;
      alert(successMessage);

      document.getElementById("signUpForm").style.display = "none";
      document.getElementById("signInQuestion").style.display = "none";
      document.getElementById("loginForm").style.display = "block";
      document.getElementById("logInQuestion").style.display = "block";
    },
    error: function (response) {
      successMessage = "Σφάλμα: " + response.message;
      alert(successMessage);
    },
  });

  var loginUsername = document.getElementById("loginUsername");
  var loginPassword = document.getElementById("loginPassword");

  loginUsername.value = "";
  loginPassword.value = "";
}


function cancelSignUp() {
  var username = document.getElementById("signUpusername");
  var password = document.getElementById("signUpPassword");
  var passwordRepeat = document.getElementById("signUpPasswordRepeat");

  username.value = "";
  password.value = "";
  passwordRepeat.value = "";
}

function showSignupForm() {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("signUpForm").style.display = "block";
  document.getElementById("signInQuestion").style.display = "block";
  document.getElementById("logInQuestion").style.display = "none";
  cancelSignUp();
}

function logIn() {
  var username = document.getElementById("loginUsername").value;
  var password = document.getElementById("loginPassword").value;
  setToken();
  var token = getToken();

  var logInData = {
    playerUsername: username,
    playerPassword: password,
    playerToken: token,
  };

  $.ajax({
    url: "PHP/logIn.php",
    method: "PUT",
    dataType: "json",
    data: JSON.stringify(logInData),
    contentType: "application/json",
    success: function (response) {
      if (response.status === "success") {
        document.getElementById("loginForm").style.display = "none";
        document.getElementById("logInQuestion").style.display = "none";
        window.location.href = "HTML/game.html";
      } else {
        console.error("Login failed:", response.message);
      }
    },
    error: function (jqXHR) {
      console.error("AJAX error:", jqXHR.responseJSON.message);
    },
  });
}

function showLogInForm() {
  document.getElementById("signUpForm").style.display = "none";
  document.getElementById("loginForm").style.display = "block";
  document.getElementById("signInQuestion").style.display = "none";
  document.getElementById("logInQuestion").style.display = "block";
}
