var buttonL = document.getElementById("buttonL")
var buttonR = document.getElementById("buttonR")
buttonL.addEventListener("click",initiateBoardL)
buttonR.addEventListener("click",initiateBoardR)

function initiateBoardL() {
    var leftBoard = document.getElementById("boardL");

    var table = document.createElement('TABLE');
    table.border = '1';

    var tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);

    for (var i = 0; i < 10; i++) {
        var tr = document.createElement('TR');
        tableBody.appendChild(tr);

        for (var j = 0; j < 10; j++) {
            var td = document.createElement('TD');
            td.width = '75';
            td.appendChild(document.createTextNode("Cell " + i + "," + j));
            tr.appendChild(td);
        }
    }
    leftBoard.appendChild(table);
}
function initiateBoardR() {
    var rightBoard = document.getElementById("boardR");

    var table = document.createElement('TABLE');
    table.border = '1';

    var tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);

    for (var i = 0; i < 10; i++) {
        var tr = document.createElement('TR');
        tableBody.appendChild(tr);

        for (var j = 0; j < 10; j++) {
            var td = document.createElement('TD');
            td.width = '75';
            td.appendChild(document.createTextNode("Cell " + i + "," + j));
            tr.appendChild(td);
        }
    }
    rightBoard.appendChild(table);
}