<?php

header('Content-Type: application/json');

global $mysqli,$stmt_verify,$stmt_update;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    include 'dbconnect.php';

    $resetBoardsData = json_decode(file_get_contents('php://input'), true);

    $token = $resetBoardsData['id'];

    $stmt_verify = $mysqli->prepare("SELECT etiketaPaikth FROM naumaxiaDB.paiktes WHERE idPaikth = ? ");
    $stmt_verify->bind_param("s", $token);
    $stmt_verify->execute();
    $stmt_verify->store_result();
    $stmt_verify->bind_result($etiketaPaikth); // Fetch the result
    $stmt_verify->fetch();

    if(strcmp($etiketaPaikth, "friend") == 0){
        $stmt_update = $mysqli->prepare("UPDATE naumaxiaDB.friendlyboard SET content = NULL");
        $stmt_update->execute();
    }else {
        $stmt_update = $mysqli->prepare("UPDATE naumaxiaDB.foeboard SET content = NULL");
        $stmt_update->execute();
    }

    if ($stmt_update->affected_rows > 0) {
        $response = array("status" => "success", "message" => "Update successful");
        $stmt_verify->close();
        $stmt_update->close();
    } else {
        $response = array("status" => "error", "message" => "Update failed");
    }


    echo json_encode($response);

    // Close both statements
}
?>
