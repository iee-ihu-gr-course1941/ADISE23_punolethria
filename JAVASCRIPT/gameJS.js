{
  var isCarrier = false;
  var isSubmarine = false;
  var isDestroyer = false;
  var isCruiser = false;
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
  //Dhmioyrgeia tou pinaka topo8ethshs twn ploiwn
  var leftBoard = document.getElementById("boardL");

  var table = document.createElement("TABLE");
  table.border = "1";

  //O pinakas exei friendlyBoard id kai to ka8e cell friendly$i,$j
  var tableBody = document.createElement("TBODY");
  tableBody.setAttribute("id", "friendlyBoard");
  table.appendChild(tableBody);

  for (var i = 0; i < 10; i++) {
    var tr = document.createElement("TR");
    tableBody.appendChild(tr);

    for (var j = 0; j < 10; j++) {
      var td = document.createElement("TD");
      td.width = "75";
      td.setAttribute("id", i + "," + j);
      td.addEventListener("click", placeShipOnBoard);
      td.appendChild(document.createTextNode("Cell " + i + "," + j));
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
      td.appendChild(document.createTextNode("Cell " + i + "," + j));
      tr.appendChild(td);
    }
  }
  rightBoard.appendChild(table);
}

function addCarrier() {
  alert(
    "Επιλέξτε τα κελιά που θα είναι η αρχή και το τέλος του πλοίου (5 σε ευθεία γραμμή κάθετα ή οριζόντια)"
  );
  document.getElementById("submarineButton").style.visibility = "hidden";
  document.getElementById("cruiserButton").style.visibility = "hidden";
  document.getElementById("destroyerButton").style.visibility = "hidden";
  isCarrier = true;
}

function addDestroyer() {
  alert(
    "Επιλέξτε τα κελιά που θα είναι η αρχή και το τέλος του πλοίου (4 σε ευθεία γραμμή κάθετα ή οριζόντια)"
  );
  document.getElementById("submarineButton").style.visibility = "hidden";
  document.getElementById("cruiserButton").style.visibility = "hidden";
  document.getElementById("carrierButton").style.visibility = "hidden";
  isDestroyer = true;
}

function addCruiser() {
  alert(
    "Επιλέξτε τα κελιά που θα είναι η αρχή και το τέλος του πλοίου (3 σε ευθεία γραμμή κάθετα ή οριζόντια)"
  );
  document.getElementById("submarineButton").style.visibility = "hidden";
  document.getElementById("carrierButton").style.visibility = "hidden";
  document.getElementById("destroyerButton").style.visibility = "hidden";
  isCruiser = true;
}

function addSubmarine() {
  alert(
    "Επιλέξτε τα κελιά που θα είναι η αρχή και το τέλος του πλοίου (2 σε ευθεία γραμμή κάθετα ή οριζόντια)"
  );
  document.getElementById("carrierButton").style.visibility = "hidden";
  document.getElementById("cruiserButton").style.visibility = "hidden";
  document.getElementById("destroyerButton").style.visibility = "hidden";
  isSubmarine = true;
}

function placeShipOnBoard(e) {
  e = e || window.event;
  e = e.target || e.srcElement;
  if (isCarrier) {
    carrierCells.push(e.id);
    if (carrierCells.length == 2) {
      isCarrier = false;
      let index_1 = String(carrierCells[0]).split(",");
      let index_2 = String(carrierCells[1]).split(",");
      x1 = index_1[0];
      y1 = index_1[1];
      x2 = index_2[0];
      y2 = index_2[1];

      if (x1 == x2) {
        if (y1 - y2 == 4 || y2 - y1 == 4) {
          alert("Correct Input!!");
          carrierPlaced = true;
          document.getElementById("carrierButton").style.visibility = "hidden";

          if (y1 - y2 == 4) {
            for (let ind = y1; ind < y2; ind--) {
              let string_index = String(x1 + "," + ind);
              document
                .getElementById(string_index)
                .removeEventListener("click", placeShipOnBoard);
              document.getElementById(string_index).style.backgroundColor =
                "gray";
            }
          } else {
            for (let ind = y1; ind <= y2; ind++) {
              let string_index = String(x1 + "," + ind);
              document
                .getElementById(string_index)
                .removeEventListener("click", placeShipOnBoard);
              document.getElementById(string_index).style.backgroundColor =
                "gray";
            }
          }
        } else {
          alert("Wrong Input!!");
          carrierCells = [];
        }
      } else if (y1 == y2) {
        if (x1 - x2 == 4 || x2 - x1 == 4) {
          alert("Correct Input!!");
          carrierPlaced = true;
          document.getElementById("carrierButton").style.visibility = "hidden";
          if (x1 - x2 == 4) {
            for (let ind = x1; ind < x2; ind--) {
              let string_index = String(ind + "," + y1);
              document
                .getElementById(string_index)
                .removeEventListener("click", placeShipOnBoard);
              document.getElementById(string_index).style.backgroundColor =
                "gray";
            }
          } else {
            for (let ind = x1; ind <= x2; ind++) {
              let string_index = String(ind + "," + y1);
              document
                .getElementById(string_index)
                .removeEventListener("click", placeShipOnBoard);
              document.getElementById(string_index).style.backgroundColor =
                "gray";
            }
          }
        } else {
          alert("Wrong Input!!");
          carrierCells = [];
        }
      } else {
        alert("Wrong Input!!");
        carrierCells = [];
      }
      if (!submarinePlaced) {
        document.getElementById("submarineButton").style.visibility = "visible";
      }
      if (!destroyerPlaced) {
        document.getElementById("destroyerButton").style.visibility = "visible";
      }
      if (!cruiserPlaced) {
        document.getElementById("cruiserButton").style.visibility = "visible";
      }
    }
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
            for (let ind = y1; ind < y2; ind--) {
              let string_index = String(x1 + "," + ind);
              document
                .getElementById(string_index)
                .removeEventListener("click", placeShipOnBoard);
              document.getElementById(string_index).style.backgroundColor =
                "gray";
            }
          } else {
            for (let ind = y1; ind <= y2; ind++) {
              let string_index = String(x1 + "," + ind);
              document
                .getElementById(string_index)
                .removeEventListener("click", placeShipOnBoard);
              document.getElementById(string_index).style.backgroundColor =
                "gray";
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
            for (let ind = x1; ind < x2; ind--) {
              let string_index = String(ind + "," + y1);
              document
                .getElementById(string_index)
                .removeEventListener("click", placeShipOnBoard);
              document.getElementById(string_index).style.backgroundColor =
                "gray";
            }
          } else {
            for (let ind = x1; ind <= x2; ind++) {
              let string_index = String(ind + "," + y1);
              document
                .getElementById(string_index)
                .removeEventListener("click", placeShipOnBoard);
              document.getElementById(string_index).style.backgroundColor =
                "gray";
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
    }
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
            for (let ind = y1; ind < y2; ind--) {
              let string_index = String(x1 + "," + ind);
              document
                .getElementById(string_index)
                .removeEventListener("click", placeShipOnBoard);
              document.getElementById(string_index).style.backgroundColor =
                "gray";
            }
          } else {
            for (let ind = y1; ind <= y2; ind++) {
              let string_index = String(x1 + "," + ind);
              document
                .getElementById(string_index)
                .removeEventListener("click", placeShipOnBoard);
              document.getElementById(string_index).style.backgroundColor =
                "gray";
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
            for (let ind = x1; ind < x2; ind--) {
              let string_index = String(ind + "," + y1);
              document
                .getElementById(string_index)
                .removeEventListener("click", placeShipOnBoard);
              document.getElementById(string_index).style.backgroundColor =
                "gray";
            }
          } else {
            for (let ind = x1; ind <= x2; ind++) {
              let string_index = String(ind + "," + y1);
              document
                .getElementById(string_index)
                .removeEventListener("click", placeShipOnBoard);
              document.getElementById(string_index).style.backgroundColor =
                "gray";
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
    }
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
            for (let ind = y1; ind < y2; ind--) {
              let string_index = String(x1 + "," + ind);
              document
                .getElementById(string_index)
                .removeEventListener("click", placeShipOnBoard);
              document.getElementById(string_index).style.backgroundColor =
                "gray";
            }
          } else {
            for (let ind = y1; ind <= y2; ind++) {
              let string_index = String(x1 + "," + ind);
              document
                .getElementById(string_index)
                .removeEventListener("click", placeShipOnBoard);
              document.getElementById(string_index).style.backgroundColor =
                "gray";
            }
          }
          if (counter > 1) {
            submarinePlaced = true;
            document.getElementById("submarineButton").style.visibility =
              "hidden";
            document.getElementById(submarineCells[0]).style.backgroundColor =
              "gray";
            document.getElementById(submarineCells[1]).style.backgroundColor =
              "gray";
          } else if (counter == 1) {
            document.getElementById(submarineCells[0]).style.backgroundColor =
              "gray";
            document.getElementById(submarineCells[1]).style.backgroundColor =
              "gray";
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
            for (let ind = x1; ind < x2; ind--) {
              let string_index = String(ind + "," + y1);
              document
                .getElementById(string_index)
                .removeEventListener("click", placeShipOnBoard);
              document.getElementById(string_index).style.backgroundColor =
                "gray";
            }
          } else {
            for (let ind = x1; ind <= x2; ind++) {
              let string_index = String(ind + "," + y1);
              document
                .getElementById(string_index)
                .removeEventListener("click", placeShipOnBoard);
              document.getElementById(string_index).style.backgroundColor =
                "gray";
            }
          }
          if (counter > 1) {
            submarinePlaced = true;
            document.getElementById("submarineButton").style.visibility =
              "hidden";
            document.getElementById(submarineCells[0]).style.backgroundColor =
              "gray";
            document.getElementById(submarineCells[1]).style.backgroundColor =
              "gray";
          } else if (counter == 1) {
            submarineCells = [];
            document.getElementById(submarineCells[0]).style.backgroundColor =
              "gray";
            document.getElementById(submarineCells[1]).style.backgroundColor =
              "gray";
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
    }
  }
}

function attackOnBoard(e) {
  e = e || window.event;
  e = e.target || e.srcElement;
  alert("Hey i am : " + e.id);
}
