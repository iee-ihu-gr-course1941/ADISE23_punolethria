{
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

//Synarthsh pou dhmiourgei tous pinakes
function initiateBoards() {
  document.getElementById("startGameButton").style.visibility = "hidden";
  document.getElementById("carrierButton").style.visibility = "visible";
  document.getElementById("cruiserButton").style.visibility = "visible";
  document.getElementById("destroyerButton").style.visibility = "visible";
  document.getElementById("submarineButton").style.visibility = "visible";
  document.getElementById("rulesButton").style.visibility = "hidden";
  //Dhmioyrgeia tou pinaka topo8ethshs twn ploiwn
  var leftBoard = document.getElementById("boardL");

  var table = document.createElement("TABLE");
  table.border = "1";

  //O pinakas exei friendlyBoard id kai to ka8e cell $i,$j
  var tableBody = document.createElement("TBODY");
  tableBody.setAttribute("id", "friendlyBoard");
  table.appendChild(tableBody);

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

  for (var i = 0; i < 10; i++) {
    var tr = document.createElement("TR");
    tableBody.appendChild(tr);

    for (var j = 0; j < 10; j++) {
      var td = document.createElement("TD");
      td.setAttribute("id", i + "," + j);
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
          alert("Correct Input!!");
          carrierPlaced = true;
          document.getElementById("carrierButton").style.visibility = "hidden";
          //To if/else xreiazetai dioti mporei o xrhsths na epeleje ta kelia apo dejia pros ta aristera h anapoda
          if (y1 - y2 == 4) {
            for (let ind = y1; ind >= y2; ind--) {
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
          alert("Correct Input!!");
          carrierPlaced = true;
          document.getElementById("carrierButton").style.visibility = "hidden";
          if (x1 - x2 == 4) {
            for (let ind = x1; ind >= x2; ind--) {
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
      if (
        cruiserPlaced &&
        submarinePlaced &&
        carrierPlaced &&
        destroyerPlaced
      ) {
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
          alert("Correct Input!!");
          cruiserPlaced = true;
          document.getElementById("cruiserButton").style.visibility = "hidden";

          if (y1 - y2 == 2) {
            for (let ind = y1; ind >= y2; ind--) {
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
          alert("Correct Input!!");
          cruiserPlaced = true;
          document.getElementById("cruiserButton").style.visibility = "hidden";
          if (x1 - x2 == 2) {
            for (let ind = x1; ind >= x2; ind--) {
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
          alert("Correct Input!!");
          destroyerPlaced = true;
          document.getElementById("destroyerButton").style.visibility =
            "hidden";

          if (y1 - y2 == 3) {
            for (let ind = y1; ind >= y2; ind--) {
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
          alert("Correct Input!!");
          destroyerPlaced = true;
          document.getElementById("destroyerButton").style.visibility =
            "hidden";
          if (x1 - x2 == 3) {
            for (let ind = x1; ind >= x2; ind--) {
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
          alert("Correct Input!!");
          counter = counter + 1;
          if (y1 - y2 == 1) {
            for (let ind = y1; ind >= y2; ind--) {
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
          alert("Correct Input!!");

          counter = counter + 1;
          if (x1 - x2 == 1) {
            for (let ind = x1; ind >= x2; ind--) {
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
        document.getElementById("attackButton").style.visibility = "visible";
      }
    }
  }
}

//Synarthsh gia epi8esh sta ploia tou antipalou
function attackOnBoard(e) {
  e = e || window.event;
  e = e.target || e.srcElement;
  if (attackIsOn) {
    alert("Attackin on : " + e.id);
    attackIsOn = false;
  } else {
    alert("You have not selected to attack!");
  }
}

function attack() {
  attackIsOn = true;
}

function goToRules() {
  window.open("./kanones.html");
}

//JSON antikeimeno
/*var data = {
  shipType: shipType,
  cellCords: cords,
};

$.ajax({
  url: "PHP/game.php",
  method: "POST",
  datatype: "json",
  data: JSON.stringify(data),
  contentType: "application/json",
  success: signUpResult,
  error: signUpError,
});*/
