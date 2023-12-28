<?php

header('Content-Type: application/json');

global $mysqli, $stmt_update;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    include 'dbconnect.php';

    $placeShipData = json_decode(file_get_contents('php://input'), true);

    $sthlh = $placeShipData['sthlh'];
    $grammh = $placeShipData['grammh'];
    $token = $placeShipData['id'];

    $stmt_verify = $mysqli->prepare("SELECT etiketaPaikth FROM naumaxiaDB.paiktes WHERE idPaikth = ? ");
    $stmt_verify->bind_param("s", $token);
    $stmt_verify->execute();
    $stmt_verify->store_result();
    $stmt_verify->bind_result($etiketaPaikth); // Fetch the result
    $stmt_verify->fetch();

    if ($stmt_verify->num_rows === 0) {
        $response = array("status" => "error", "message" => "Κάτι δεν πήγε καλά!");
    } else {
        if(strcmp($etiketaPaikth, "friend") == 0){
            $stmt_update = $mysqli->prepare("UPDATE naumaxiaDB.friendlyboard SET content = 1 WHERE grammh = ? AND sthlh = ? ");
            $stmt_update->bind_param("ii", $grammh, $sthlh);
            $stmt_update->execute();
        } else {
            $stmt_update = $mysqli->prepare("UPDATE naumaxiaDB.foeboard SET content = 1 WHERE grammh = ? AND sthlh = ? ");
            $stmt_update->bind_param("ii", $grammh, $sthlh);
            $stmt_update->execute();
        }
        if ($stmt_update->affected_rows > 0) {
            $response = array("status" => "success", "message" => "Update successful");
            $stmt_verify->close();
            $stmt_update->close();
        } else {
            $response = array("status" => "error", "message" => "Update failed");
        }
    }

    echo json_encode($response);

    // Close both statements
}
?>
