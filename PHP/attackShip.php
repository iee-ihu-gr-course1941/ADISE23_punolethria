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
            $stmt_select = $mysqli->prepare("SELECT content FROM naumaxiaDB.foeboard WHERE grammh = ?, sthlh = ? ");
            $stmt_select->bind_param("ss", $grammh, $sthlh);
            $stmt_select->execute();
            $stmt_select->store_result();
            $stmt_select->bind_result($content);
            $stmt_select->fetch();
            echo $content
        }
        else{
            $stmt_select = $mysqli->prepare("SELECT content FROM naumaxiaDB.friendlyboard WHERE grammh = ?, sthlh = ? ");
            $stmt_select->bind_param("ss", $grammh, $sthlh);
            $stmt_select->execute();
        }
    }

    echo json_encode($content);

    // Close both statements
}
?>