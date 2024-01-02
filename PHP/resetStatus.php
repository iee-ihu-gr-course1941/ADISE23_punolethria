<?php

header('Content-Type: application/json');

global $mysqli,$stmt_verify,$stmt_update;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    include 'dbconnect.php';

    $stmt_verify = $mysqli->prepare("UPDATE naumaxiaDB.statuspaixnidiou SET game_status = 'not active',result = NULL, round=-3");
    $stmt_verify->execute();

    if ($stmt_verify->affected_rows > 0) {
        $response = array("status" => "success", "message" => "Επιτυχής ενημέρωση!");
        $stmt_verify->close();
    } else {
        $response = array("status" => "error", "message" => "Σφάλμα κατά την ενημέρωση!");
    }


    echo json_encode($response);

    // Close both statements
}
?>
