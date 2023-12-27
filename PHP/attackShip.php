<?php

header('Content-Type: application/json');

global $mysqli, $stmt_update;

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    include 'dbconnect.php';

    $placeShipData = json_decode(file_get_contents('php://input'), true);

    $sthlh = $placeShipData['playerUsername'];
    $grammh = $placeShipData['playerPassword'];
    $token = $placeShipData['id'];

    $stmt_verify = $mysqli->prepare("SELECT etiketaPaikth FROM naumaxiaDB.paiktes WHERE idPaikth = ? ");
    $stmt_verify->bind_param("s", $token);
    $stmt_verify->execute();
    $stmt_verify->store_result();

    if ($stmt_verify->num_rows === 0) {
        $response = array("status" => "error", "message" => "Κάτι δεν πήγε καλά!");

    } else {
        if(strcmp($stmt_verify,"friendly")==0){
            $stmt_select = $mysqli->prepare("SELECT naumaxiaDB.friendlyboard WHERE grammh = ?, sthlh = ? ");
            $stmt_select->bind_param("ss", $grammh, $sthlh);
            $stmt_select->execute();
        }
        else{
            $stmt_select = $mysqli->prepare("SELECT naumaxiaDB.foeboard WHERE grammh = ?, sthlh = ? ");
            $stmt_select->bind_param("ss", $grammh, $sthlh);
            $stmt_select->execute();
        }
        if ($stmt_select->affected_rows > 0) {
            $response = array("status" => "success", "message" => "Update successful");
            $stmt_verify->close();
            $stmt_select->close();
        } else {
            $response = array("status" => "error", "message" => "Update failed");
        }
    }

    echo json_encode($response);

    // Close both statements
}
?>