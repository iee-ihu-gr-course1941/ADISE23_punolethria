<?php

header('Content-Type: application/json');

global $mysqli, $stmt_update;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    include 'dbconnect.php';

    $resetBoardsData = json_decode(file_get_contents('php://input'), true);

    $token = $resetBoardsData['id'];


    if(strcmp($etiketaPaikth, "friendly") == 0){
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
