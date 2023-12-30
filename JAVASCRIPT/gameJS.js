//Arxikopoihsh twn listeners
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

//Global metavlhtes
{
  var token;
  var isCarrier = false;
  var isSubmarine = false;
  var isDestroyer = false;
  var isCruiser = false;
  var attackIsOn = false;
  var carrierPlaced = false;
  var submarinePlaced = false;
  var destroyerPlaced = false;
  var cruiserPlaced = false;
  var carrierCells = [];
  var submarineCells = [];
  var destroyerCells = [];
  var cruiserCells = [];
  var usedCells = [];
  var counter = 0;
}

//H synarthsh setToken() orizei ena monadiko tyxaio 16bit token gia na ginetai eykola to authentication tou ka8e xrhsth
function setToken() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
  var counter = 0;
  token = "";
  while (counter < 16) {
    token += characters.charAt(Math.floor(Math.random() * 62));
    counter += 1;
  }
}

//start main.js

//H synarthsh ypey8ynh gia thn egrafh twn xrhstwn sthn bash
function signUp() {
  //apo8hkeysh tou input toy xrhsth se metavlhtes
  var username = document.getElementById("signUpusername").value;
  var password = document.getElementById("signUpPassword").value;
  var passwordRepeat = document.getElementById("signUpPasswordRepeat").value;
  //var tagName = selectedTag();
  //ana8esh token ston xrhsth pou ekane sign up
  setToken();
  //elegxos gia kena username h password
  if (username === "" || password === "" || passwordRepeat === "") {
    window.alert("Please fill in all fields.");
    return false;
  } //elegxos oti ta password einai idia
  if (password != passwordRepeat) {
    window.alert("Passwords do not match!");
    return false;
  }

  //Dhmhiourgia enos JSON antikeimeno
  var signUpdata = {
    //playerTag: tagName,
    playerUsername: username,
    playerPassword: password,
    playerPasswordRepeat: passwordRepeat,
    playerToken: token,
  };

  //klhsh Ajax gia eggrafh tou neou xrhsth sthn vash
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

//Synarthsh syndeshs tou xrhsth me thn bash
function logIn() {
  //Apo8hkeysh tou input tou xrhsth se metavlhtes
  var username = document.getElementById("loginUsername").value;
  var password = document.getElementById("loginPassword").value;
  //H ana8esh tou token ginetai ka8e fora pou kanei login o xrhsths ka8ws einai monadiko se ka8e session tou
  setToken();
  //Apo8hkeysh tou token sto session storage wste na einai emfanes kai meta apo allagh sthn current selida
  window.sessionStorage.setItem("token", token);
  var logInData = {
    playerUsername: username,
    playerPassword: password,
    playerToken: token,
  };

  //Ajax gia syndesh me thn bash kai oristiko login tou xrhsth
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
        //an ola pane kala o xrhsths blepei thn game.html
        window.location.href = "HTML/game.html";
      } else {
        console.error("Login failed:", response.message);
      }
    },
    error: function (jqXHR) {
      console.error("AJAX error:", jqXHR.responseJSON.message);
    },
  });

  //Enhmerwsh tou status tou paixnidiou

  updateStatusLogin();
}

function showLogInForm() {
  document.getElementById("signUpForm").style.display = "none";
  document.getElementById("loginForm").style.display = "block";
  document.getElementById("signInQuestion").style.display = "none";
  document.getElementById("logInQuestion").style.display = "block";
}

//end of main.js

//Synarthsh pou dhmiourgei tous pinakes
function initiateBoards() {
  //apo8hkeysh toy token tou xrhsth (pou phre timh sto login) se topikh metavlhth
  token = window.sessionStorage.getItem("token");
  //emfanish twn koumpiwn topo8ethshs ploiwn kai "svhsimo" twn enarji paixnidiou kai kanonwn
  document.getElementById("startGameButton").style.visibility = "hidden";
  document.getElementById("carrierButton").style.visibility = "visible";
  document.getElementById("cruiserButton").style.visibility = "visible";
  document.getElementById("destroyerButton").style.visibility = "visible";
  document.getElementById("submarineButton").style.visibility = "visible";
  document.getElementById("rulesButton").style.visibility = "hidden";

  //Dhmiourgeia JSON antikeimenou me to token
  var resetBoardsData = {
    id: token,
  };

  //Reset tou board gia ton antistoixo xrhsth
  $.ajax({
    url: "../PHP/resetBoards.php",
    method: "POST",
    dataType: "json",
    data: JSON.stringify(resetBoardsData),
    contentType: "application/json",
    success: function (response) {
      successMessage = response.message;
      console.log(successMessage);
    },
    error: function (response) {
      successMessage = "Σφάλμα: " + response.message;
      console.log(successMessage);
    },
  });

  //Dhmioyrgeia tou pinaka topo8ethshs twn ploiwn
  var leftBoard = document.getElementById("boardL");

  var table = document.createElement("TABLE");
  table.border = "1";

  //O pinakas exei friendlyBoard id kai to ka8e cell $i,$j
  var tableBody = document.createElement("TBODY");
  tableBody.setAttribute("id", "friendlyBoard");
  table.appendChild(tableBody);

  //dhmiourgia twn keliwn tou friendlyBoard me event listener gia topo8ethsh ploiwn
  for (var i = 0; i < 10; i++) {
    var tr = document.createElement("TR");
    tableBody.appendChild(tr);

    for (var j = 0; j < 10; j++) {
      var td = document.createElement("TD");
      td.width = "75";
      td.height = "25";
      td.setAttribute("id", i + "," + j);
      td.addEventListener("click", placeShipOnBoard);
      td.appendChild(document.createTextNode(" "));
      tr.appendChild(td);
    }
  }
  leftBoard.appendChild(table);

  //Dhmiourgeia tou pinaka epi8eshs sta ploia tou antipalou
  var rightBoard = document.getElementById("boardR");

  var table = document.createElement("TABLE");
  table.border = "1";

  //O pinakas exei hostileBoard id kai to ka8e cell hostile$i,$j
  var tableBody = document.createElement("TBODY");
  tableBody.setAttribute("id", "hostileBoard");
  table.appendChild(tableBody);

  //dhmiourgia twn keliwn tou hostileBoard me event listener gia epi8esh sta ploia
  for (var i = 0; i < 10; i++) {
    var tr = document.createElement("TR");
    tableBody.appendChild(tr);

    for (var j = 0; j < 10; j++) {
      var td = document.createElement("TD");
      td.setAttribute("id", "enemy," + i + "," + j);
      td.addEventListener("click", attackOnBoard);
      td.width = "75";
      td.height = "25";
      td.appendChild(document.createTextNode(" "));
      tr.appendChild(td);
    }
  }
  rightBoard.appendChild(table);
}

//H synarthsh energopoiei thn leitourgeia gia topo8ethsh aeroplanoforou ston pinaka
function addCarrier() {
  alert(
    "Επιλέξτε τα κελιά που θα είναι η αρχή και το τέλος του πλοίου (5 σε ευθεία γραμμή κάθετα ή οριζόντια)"
  );
  //svisimo twn ypoloipwn buttons mexri na teleiwsei h topo8ethsh aytou tou ploiou
  document.getElementById("submarineButton").style.visibility = "hidden";
  document.getElementById("cruiserButton").style.visibility = "hidden";
  document.getElementById("destroyerButton").style.visibility = "hidden";
  isCarrier = true;
}

//H synarthsh energopoiei thn leitourgeia gia topo8ethsh antitorpilikou ston pinaka
function addDestroyer() {
  alert(
    "Επιλέξτε τα κελιά που θα είναι η αρχή και το τέλος του πλοίου (4 σε ευθεία γραμμή κάθετα ή οριζόντια)"
  );
  //svisimo twn ypoloipwn buttons mexri na teleiwsei h topo8ethsh aytou tou ploiou
  document.getElementById("submarineButton").style.visibility = "hidden";
  document.getElementById("cruiserButton").style.visibility = "hidden";
  document.getElementById("carrierButton").style.visibility = "hidden";
  isDestroyer = true;
}

//synarthsh energopoiei thn leitourgeia gia topo8ethsh Polemikou ston pinaka
function addCruiser() {
  alert(
    "Επιλέξτε τα κελιά που θα είναι η αρχή και το τέλος του πλοίου (3 σε ευθεία γραμμή κάθετα ή οριζόντια)"
  );
  //svisimo twn ypoloipwn buttons mexri na teleiwsei h topo8ethsh aytou tou ploiou
  document.getElementById("submarineButton").style.visibility = "hidden";
  document.getElementById("carrierButton").style.visibility = "hidden";
  document.getElementById("destroyerButton").style.visibility = "hidden";
  isCruiser = true;
}

//synarthsh energopoiei thn leitourgeia gia topo8ethsh ypobrixiou ston pinaka
function addSubmarine() {
  alert(
    "Επιλέξτε τα κελιά που θα είναι η αρχή και το τέλος του πλοίου (2 σε ευθεία γραμμή κάθετα ή οριζόντια)"
  );
  //svisimo twn ypoloipwn buttons mexri na teleiwsei h topo8ethsh aytou tou ploiou
  document.getElementById("carrierButton").style.visibility = "hidden";
  document.getElementById("cruiserButton").style.visibility = "hidden";
  document.getElementById("destroyerButton").style.visibility = "hidden";
  isSubmarine = true;
}

//Basikh synarthsh tou game, topo8etei ta ploia ston pinaka
function placeShipOnBoard(e) {
  //to e krataei to keli sto opoio ekane click o paikths
  e = e || window.event;
  e = e.target || e.srcElement;

  //Ta if(isCarrier, isSubmarine, ...) elegxoun poio ploio topo8eteitai ka8e stigmh ston pinaka
  if (isCarrier) {
    //To carrierCells emperiexei ta kelia pou apoteloyn arxh kai telos tou aeroplanoforou
    carrierCells.push(e.id);
    //Elegxos an exoun epilegxei 2 kelia apo ton xrhsth gia thn topo8ethsh tou carrier
    if (carrierCells.length == 2) {
      isCarrier = false;
      //Apo8hkeysh twn syntetagmenwn twn keliwn se 4 metavlhtes x1,y1,x2,y2
      let index_1 = String(carrierCells[0]).split(",");
      let index_2 = String(carrierCells[1]).split(",");
      x1 = index_1[0];
      y1 = index_1[1];
      x2 = index_2[0];
      y2 = index_2[1];

      //An ta dyo kelia briskontai sthn idia grammh
      if (x1 == x2) {
        //Elegxos an exoun epilagei swsta kelia apo ton xrhsth
        if (y1 - y2 == 4 || y2 - y1 == 4) {
          //alert("Correct Input!!");
          carrierPlaced = true;
          document.getElementById("carrierButton").style.visibility = "hidden";
          //To if/else xreiazetai dioti mporei o xrhsths na epeleje ta kelia apo dejia pros ta aristera h anapoda
          if (y1 - y2 == 4) {
            for (let ind = y1; ind >= y2; ind--) {
              placeShipOnBoardDb(x1, ind);
              console.log("Y1:" + y1 + " Y2:" + y2);
              //Afaireitai o EventListener wste o xrhsths na mhn mporei na pathsei kelia sta opoia einai topo8ethmeno hsh ploio kai meta bafontai gri
              let string_index = String(x1 + "," + ind);
              document
                .getElementById(string_index)
                .removeEventListener("click", placeShipOnBoard);
              document.getElementById(string_index).style.backgroundColor =
                "#666666";
              document.getElementById(string_index).style.border = "#666666";
            }
          } else {
            for (let ind = y1; ind <= y2; ind++) {
              placeShipOnBoardDb(x1, ind);
              let string_index = String(x1 + "," + ind);
              document
                .getElementById(string_index)
                .removeEventListener("click", placeShipOnBoard);
              document.getElementById(string_index).style.backgroundColor =
                "#666666";
              document.getElementById(string_index).style.border = "#666666";
            }
          }
          //to else einai h periptwsh pou den exei ginei swsta h epilogh twn keliwn  apo ton xrhsth
        } else {
          alert("Wrong Input!!");
          carrierCells = [];
        }
        //Idia diadikasia me prin alla gia ta kelia na briskontai sthn idia sthlh
      } else if (y1 == y2) {
        if (x1 - x2 == 4 || x2 - x1 == 4) {
          //alert("Correct Input!!");
          carrierPlaced = true;
          document.getElementById("carrierButton").style.visibility = "hidden";
          if (x1 - x2 == 4) {
            for (let ind = x1; ind >= x2; ind--) {
              placeShipOnBoardDb(ind, y1);
              let string_index = String(ind + "," + y1);
              document
                .getElementById(string_index)
                .removeEventListener("click", placeShipOnBoard);
              document.getElementById(string_index).style.backgroundColor =
                "#666666";
              document.getElementById(string_index).style.border = "#666666";
            }
          } else {
            for (let ind = x1; ind <= x2; ind++) {
              placeShipOnBoardDb(ind, y1);
              let string_index = String(ind + "," + y1);
              document
                .getElementById(string_index)
                .removeEventListener("click", placeShipOnBoard);
              document.getElementById(string_index).style.backgroundColor =
                "#666666";
              document.getElementById(string_index).style.border = "#666666";
            }
          }
        } else {
          alert("Wrong Input!!");
          carrierCells = [];
        }
        //Elegxos an ta kelia einai entelws la8os dld diaforetikh seira kai sthlh
      } else {
        alert("Wrong Input!!");
        carrierCells = [];
      }
      //Emfanisi twn Koumpiwn gia topo8ethsh twn allwn ploiwn arkei na mhn exoun hdh topo8eth8ei prohgoumenos
      if (!submarinePlaced) {
        document.getElementById("submarineButton").style.visibility = "visible";
      }
      if (!destroyerPlaced) {
        document.getElementById("destroyerButton").style.visibility = "visible";
      }
      if (!cruiserPlaced) {
        document.getElementById("cruiserButton").style.visibility = "visible";
      }
      //elegxos an o xrhsths exei topo8ethsei ola tou ta ploia kai enhmerwsh tou status
      if (
        cruiserPlaced &&
        submarinePlaced &&
        carrierPlaced &&
        destroyerPlaced
      ) {
        updateStatus();
        document.getElementById("attackButton").style.visibility = "visible";
      }
    }
    //idia diadikasia me to carrier apla gia to cruiser
  } else if (isCruiser) {
    cruiserCells.push(e.id);
    if (cruiserCells.length == 2) {
      isCruiser = false;
      let index_1 = String(cruiserCells[0]).split(",");
      let index_2 = String(cruiserCells[1]).split(",");

      x1 = index_1[0];
      y1 = index_1[1];
      x2 = index_2[0];
      y2 = index_2[1];

      if (x1 == x2) {
        if (y1 - y2 == 2 || y2 - y1 == 2) {
          //alert("Correct Input!!");
          cruiserPlaced = true;
          document.getElementById("cruiserButton").style.visibility = "hidden";

          if (y1 - y2 == 2) {
            for (let ind = y1; ind >= y2; ind--) {
              placeShipOnBoardDb(x1, ind);

              let string_index = String(x1 + "," + ind);
              document
                .getElementById(string_index)
                .removeEventListener("click", placeShipOnBoard);
              document.getElementById(string_index).style.backgroundColor =
                "#707070";
              document.getElementById(string_index).style.border = "#707070";
            }
          } else {
            for (let ind = y1; ind <= y2; ind++) {
              placeShipOnBoardDb(x1, ind);

              let string_index = String(x1 + "," + ind);
              document
                .getElementById(string_index)
                .removeEventListener("click", placeShipOnBoard);
              document.getElementById(string_index).style.backgroundColor =
                "#707070";
              document.getElementById(string_index).style.border = "#707070";
            }
          }
        } else {
          alert("Wrong Input!!");
          cruiserCells = [];
        }
      } else if (y1 == y2) {
        if (x1 - x2 == 2 || x2 - x1 == 2) {
          //alert("Correct Input!!");
          cruiserPlaced = true;
          document.getElementById("cruiserButton").style.visibility = "hidden";
          if (x1 - x2 == 2) {
            for (let ind = x1; ind >= x2; ind--) {
              placeShipOnBoardDb(ind, y1);
              let string_index = String(ind + "," + y1);
              document
                .getElementById(string_index)
                .removeEventListener("click", placeShipOnBoard);
              document.getElementById(string_index).style.backgroundColor =
                "#707070";
              document.getElementById(string_index).style.border = "#707070";
            }
          } else {
            for (let ind = x1; ind <= x2; ind++) {
              placeShipOnBoardDb(ind, y1);
              let string_index = String(ind + "," + y1);
              document
                .getElementById(string_index)
                .removeEventListener("click", placeShipOnBoard);
              document.getElementById(string_index).style.backgroundColor =
                "#707070";
              document.getElementById(string_index).style.border = "#707070";
            }
          }
        } else {
          alert("Wrong Input!!");
          cruiserCells = [];
        }
      } else {
        alert("Wrong Input!!");
        cruiserCells = [];
      }

      if (!submarinePlaced) {
        document.getElementById("submarineButton").style.visibility = "visible";
      }
      if (!carrierPlaced) {
        document.getElementById("carrierButton").style.visibility = "visible";
      }
      if (!destroyerPlaced) {
        document.getElementById("destroyerButton").style.visibility = "visible";
      }
      if (
        cruiserPlaced &&
        submarinePlaced &&
        carrierPlaced &&
        destroyerPlaced
      ) {
        updateStatus();
        document.getElementById("attackButton").style.visibility = "visible";
      }
    }
    //idia diadikasia me to carrier apla gia to destroyer
  } else if (isDestroyer) {
    destroyerCells.push(e.id);
    if (destroyerCells.length == 2) {
      isDestroyer = false;
      let index_1 = String(destroyerCells[0]).split(",");
      let index_2 = String(destroyerCells[1]).split(",");

      x1 = index_1[0];
      y1 = index_1[1];
      x2 = index_2[0];
      y2 = index_2[1];

      if (x1 == x2) {
        if (y1 - y2 == 3 || y2 - y1 == 3) {
          //alert("Correct Input!!");
          destroyerPlaced = true;
          document.getElementById("destroyerButton").style.visibility =
            "hidden";

          if (y1 - y2 == 3) {
            for (let ind = y1; ind >= y2; ind--) {
              placeShipOnBoardDb(x1, ind);

              console.log("Eimai edw");
              let string_index = String(x1 + "," + ind);
              document
                .getElementById(string_index)
                .removeEventListener("click", placeShipOnBoard);
              document.getElementById(string_index).style.backgroundColor =
                "#5d5555";
              document.getElementById(string_index).style.border = "#5d5555";
            }
          } else {
            for (let ind = y1; ind <= y2; ind++) {
              placeShipOnBoardDb(x1, ind);

              let string_index = String(x1 + "," + ind);
              document
                .getElementById(string_index)
                .removeEventListener("click", placeShipOnBoard);
              document.getElementById(string_index).style.backgroundColor =
                "#5d5555";
              document.getElementById(string_index).style.border = "#5d5555";
            }
          }
        } else {
          alert("Wrong Input!!");
          destroyerCells = [];
        }
      } else if (y1 == y2) {
        if (x1 - x2 == 3 || x2 - x1 == 3) {
          //alert("Correct Input!!");
          destroyerPlaced = true;
          document.getElementById("destroyerButton").style.visibility =
            "hidden";
          if (x1 - x2 == 3) {
            for (let ind = x1; ind >= x2; ind--) {
              placeShipOnBoardDb(ind, y1);
              let string_index = String(ind + "," + y1);
              document
                .getElementById(string_index)
                .removeEventListener("click", placeShipOnBoard);
              document.getElementById(string_index).style.backgroundColor =
                "#5d5555";
              document.getElementById(string_index).style.border = "#5d5555";
            }
          } else {
            for (let ind = x1; ind <= x2; ind++) {
              placeShipOnBoardDb(ind, y1);
              let string_index = String(ind + "," + y1);
              document
                .getElementById(string_index)
                .removeEventListener("click", placeShipOnBoard);
              document.getElementById(string_index).style.backgroundColor =
                "#5d5555";
              document.getElementById(string_index).style.border = "#5d5555";
            }
          }
        } else {
          alert("Wrong Input!!");
          destroyerCells = [];
        }
      } else {
        alert("Wrong Input!!");
        destroyerCells = [];
      }
      if (!submarinePlaced) {
        document.getElementById("submarineButton").style.visibility = "visible";
      }
      if (!carrierPlaced) {
        document.getElementById("carrierButton").style.visibility = "visible";
      }
      if (!cruiserPlaced) {
        document.getElementById("cruiserButton").style.visibility = "visible";
      }
      if (
        cruiserPlaced &&
        submarinePlaced &&
        carrierPlaced &&
        destroyerPlaced
      ) {
        updateStatus();
        document.getElementById("attackButton").style.visibility = "visible";
      }
    }
    //idia diadikasia me to carrier apla gia to submarine
  } else if (isSubmarine) {
    submarineCells.push(e.id);
    if (submarineCells.length == 2) {
      isSubmarine = false;
      let index_1 = String(submarineCells[0]).split(",");
      let index_2 = String(submarineCells[1]).split(",");

      x1 = index_1[0];
      y1 = index_1[1];
      x2 = index_2[0];
      y2 = index_2[1];

      if (x1 == x2) {
        if (y1 - y2 == 1 || y2 - y1 == 1) {
          //alert("Correct Input!!");
          counter = counter + 1;
          if (y1 - y2 == 1) {
            for (let ind = y1; ind >= y2; ind--) {
              placeShipOnBoardDb(x1, ind);

              let string_index = String(x1 + "," + ind);
              document
                .getElementById(string_index)
                .removeEventListener("click", placeShipOnBoard);
              document.getElementById(string_index).style.backgroundColor =
                "#716868";
              document.getElementById(string_index).style.border = "#716868";
            }
          } else {
            for (let ind = y1; ind <= y2; ind++) {
              placeShipOnBoardDb(x1, ind);

              let string_index = String(x1 + "," + ind);
              document
                .getElementById(string_index)
                .removeEventListener("click", placeShipOnBoard);
              document.getElementById(string_index).style.backgroundColor =
                "#716868";
              document.getElementById(string_index).style.border = "#716868";
            }
          }
          if (counter > 1) {
            submarinePlaced = true;
            document.getElementById("submarineButton").style.visibility =
              "hidden";
            document.getElementById(submarineCells[0]).style.backgroundColor =
              "#716868";
            document.getElementById(submarineCells[1]).style.backgroundColor =
              "#716868";
            document.getElementById(submarineCells[0]).style.border = "#716868";
            document.getElementById(submarineCells[1]).style.border = "#716868";
          } else if (counter == 1) {
            document.getElementById(submarineCells[0]).style.backgroundColor =
              "#716868";
            document.getElementById(submarineCells[1]).style.backgroundColor =
              "#716868";
            document.getElementById(submarineCells[0]).style.border = "#716868";
            document.getElementById(submarineCells[1]).style.border = "#716868";
            submarineCells = [];
          }
        } else {
          alert("Wrong Input!!");
          submarineCells = [];
        }
      } else if (y1 == y2) {
        if (x1 - x2 == 1 || x2 - x1 == 1) {
          //alert("Correct Input!!");
          counter = counter + 1;
          if (x1 - x2 == 1) {
            for (let ind = x1; ind >= x2; ind--) {
              placeShipOnBoardDb(ind, y1);
              let string_index = String(ind + "," + y1);
              document
                .getElementById(string_index)
                .removeEventListener("click", placeShipOnBoard);
              document.getElementById(string_index).style.backgroundColor =
                "#716868";
              document.getElementById(string_index).style.border = "#716868";
            }
          } else {
            for (let ind = x1; ind <= x2; ind++) {
              placeShipOnBoardDb(ind, y1);
              let string_index = String(ind + "," + y1);
              document
                .getElementById(string_index)
                .removeEventListener("click", placeShipOnBoard);
              document.getElementById(string_index).style.backgroundColor =
                "#716868";
              document.getElementById(string_index).style.border = "#716868";
            }
          }
          if (counter > 1) {
            submarinePlaced = true;
            document.getElementById("submarineButton").style.visibility =
              "hidden";
            document.getElementById(submarineCells[0]).style.backgroundColor =
              "#716868";
            document.getElementById(submarineCells[1]).style.backgroundColor =
              "#716868";
            document.getElementById(submarineCells[0]).style.border = "#716868";
            document.getElementById(submarineCells[1]).style.border = "#716868";
          } else if (counter == 1) {
            submarineCells = [];
            document.getElementById(submarineCells[0]).style.backgroundColor =
              "#716868";
            document.getElementById(submarineCells[1]).style.backgroundColor =
              "#716868";
            document.getElementById(submarineCells[0]).style.border = "#716868";
            document.getElementById(submarineCells[1]).style.border = "#716868";
          }
        } else {
          alert("Wrong Input!!");
          submarineCells = [];
        }
      } else {
        alert("Wrong Input!!");
        submarineCells = [];
      }
      if (!destroyerPlaced) {
        document.getElementById("destroyerButton").style.visibility = "visible";
      }
      if (!carrierPlaced) {
        document.getElementById("carrierButton").style.visibility = "visible";
      }
      if (!cruiserPlaced) {
        document.getElementById("cruiserButton").style.visibility = "visible";
      }
      if (
        cruiserPlaced &&
        submarinePlaced &&
        carrierPlaced &&
        destroyerPlaced
      ) {
        updateStatus();
        document.getElementById("attackButton").style.visibility = "visible";
      }
    }
  }
}

//Synarthsh gia epi8esh sta ploia tou antipalou
function attackOnBoard(e) {
  //apo8hkeysh twn syntetagmenwn tou keliou pou path8hke
  e = e || window.event;
  e = e.target || e.srcElement;
  id = e.id;
  cords = String(id).split(",");
  x = parseInt(cords[1]);
  y = parseInt(cords[2]);
  //elegxos an exei path8ei to koumpi attack
  if (attackIsOn) {
    //Klhsh ths synarthshs elegxou gia to apotelesma tou attack
    alert("Attackin on : " + e.id);
    attackShip(x, y);
  } else {
    alert("You have not selected to attack!");
  }
}

//Path8hke to koumpi attack
function attack() {
  checkStatus();
  round = window.sessionStorage.getItem("round");
  tag = window.sessionStorage.getItem("id");
  if (String(tag).localeCompare("friendly") == 0) {
    if (round % 2 == 0) {
      attackIsOn = true;
    } else {
      alert("Είναι η σειρά του αντιπάλου να επιτεθεί");
    }
  } else {
    if (round % 2 != 0) {
      attackIsOn = true;
    } else {
      alert("Είναι η σειρά του αντιπάλου να επιτεθεί");
    }
  }
}

//Path8hke to koumpi rules
function goToRules() {
  window.open("./kanones.html");
}

//Synarthsh topo8ethshs ploiwn sthn bash, ka8e keli ploiou prosti8etai seiriaka ston antistoixo pinaka kai oxi ka8e ploio oloklhro
function placeShipOnBoardDb(x, y) {
  //eisodos twn syntetagmenwn tou keliou
  x = parseInt(x);
  y = parseInt(y);

  //Dhmiourgeia enos JSON antikeimenou
  var placeShipData = {
    grammh: x,
    sthlh: y,
    id: token,
  };

  //klhsh tou Ajax gia thn topo8ethsh tou ka8e keliou tou ploiou sthn bash
  $.ajax({
    url: "../PHP/placeShipOnBoard.php",
    method: "POST",
    dataType: "json",
    data: JSON.stringify(placeShipData),
    contentType: "application/json",
    success: function (response) {
      successMessage = response.message;
      console.log(successMessage);
    },
    error: function (response) {
      //An kati den paei kala (O xrhsths topo8ethsei la8os ta ploia h diadikasia topo8ethshs jekinaei apo thn arxh)
      successMessage = "Σφάλμα: " + response.message;
      alert("Wrong Input");
      initiateBoards;
    },
  });
}

//H synarthsh elegxou tou apotelesmatos ths epi8eshs
function attackShip(x, y) {
  //apo8hkeysh tou token se topikh metavlhth
  token = window.sessionStorage.getItem("token");
  //Dhmiourgeia enos JSON antikeimenou
  var attackShipData = {
    grammh: x,
    sthlh: y,
    id: token,
    content: 0,
  };

  //Klhsh tou ajax gia diapistosh an yparxei ploio h oxi sto antistoixo keli tou pinaka tou antipalou
  $.ajax({
    url: "../PHP/attackShip.php",
    method: "POST",
    dataType: "json",
    data: JSON.stringify(attackShipData),
    contentType: "application/json",
    async: !1,
    //an ola pane kala 8a klh8ei h attackResult
    success: attackResult,
    error: function (response) {
      successMessage = "Σφάλμα: " + response.message;
      console.log(successMessage);
    },
  });
}

//Kaleitai otan ola pane kala me to ajax sthn epi8esh kai kalei thn attackOnBoardResult(data) me to data na einai to JSON pou epistrefei to ajax
function attackResult(data) {
  attackOnBoardResult(data);
}

//Kanei ton oristiko elegxo gia thn yparxh h mh ploiou sto keli pou epite8hke o xrhsths
function attackOnBoardResult(data) {
  //apo8hkeysh tou json pou epestrepse to ajax se topikh metavlhth
  attackData = data;
  //apo8hkeysh twn timwn tou JSON se topikes metavlhtes
  var x = attackData.grammh;
  var y = attackData.sthlh;
  var result = attackData.content;
  //Dhmiourgeia tou html id tou keliou apo ta x kai y
  id = "enemy," + String(x) + "," + String(y);
  //An eixe ploio sto keli, to bafei kokkino kai enhmerwnei ton xrhsth
  if (result == 1) {
    document.getElementById(id).style.backgroundColor = "#8b0000";
    alert("YOU GOT A HIT ON ENEMY SHIP!!");
  } //An oxi, to bafei mple kai enhmerwnei ton xrhsth
  else {
    document.getElementById(id).style.backgroundColor = "#000080";
    alert("Unfortunetly you missed");
  }
  //Afairesh tou event listener apo to keli wste na mhn mporei na ginei attack se ena keli 2 fores
  document.getElementById(id).removeEventListener("click", attackOnBoard);
  //Epanafora tou attack flag sto false
  attackIsOn = false;
  //enhmerwsh tou status tou paixnidiou
  updateStatus();
}

function updateStatusLogin() {
  //apo8hkeysh tou token se topikh metavlhth
  token = window.sessionStorage.getItem("token");
  //Dhmiourgeia enos JSON antikeimenou
  var updateStatusData = {
    id: token,
    end_of_game: false,
    round: 0,
    winner: "",
  };
  //Xrhsh Ajax gia thn enhmerwsh tou status tou paixnidiou
  $.ajax({
    url: "PHP/gameStatus.php",
    method: "POST",
    dataType: "json",
    data: JSON.stringify(updateStatusData),
    contentType: "application/json",
    //an ola pane kala kaleitai h checkStatus
    success: checkStatus,
    error: function (response) {
      successMessage = "Σφάλμα: " + response.message;
      alert(successMessage);
    },
  });
}

//Synarthsh enhmerwshs tou status tou paixnidiou
function updateStatus() {
  //apo8hkeysh tou token se topikh metavlhth
  token = window.sessionStorage.getItem("token");
  //Dhmiourgeia enos JSON antikeimenou
  var updateStatusData = {
    id: token,
    end_of_game: false,
    round: 0,
    winner: "",
  };
  //Xrhsh Ajax gia thn enhmerwsh tou status tou paixnidiou
  $.ajax({
    url: "../PHP/gameStatus.php",
    method: "POST",
    dataType: "json",
    data: JSON.stringify(updateStatusData),
    contentType: "application/json",
    //an ola pane kala kaleitai h checkStatus
    success: checkStatus,
    error: function (response) {
      successMessage = "Σφάλμα: " + response.message;
      alert(successMessage);
    },
  });
}

//Synarthsh pou elegxei thn katastash tou paixnidiou
function checkStatus(data) {
  //apo8hkeysh twn timwn tou json pou epistrefei to ajax se topikes metavlhtes
  statusData = data;
  //to id edw DEN einai to token ALLA h etiketa tou user
  var id = statusData.id;
  var hasEnded = statusData.end_of_game;
  var round = statusData.round;
  var winner = statusData.winner;
  //
  if (hasEnded) {
    if (winner == id) {
      alert("Congratulations you WON!!");
    } else {
      alert("Sorry You've Lost!!");
    }

    $.ajax({
      url: "../PHP/resetStatus.php",
      method: "POST",
      contentType: "application/json",
      success: function (response) {
        successMessage = response.message;
        console.log(successMessage);
      },
      error: function (response) {
        successMessage = "Σφάλμα: " + response.message;
        alert(successMessage);
      },
    });
    initiateBoards();
  }
  window.sessionStorage.setItem("round", round);
  window.sessionStorage.setItem("tag", id);
}
