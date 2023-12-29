<?php

header('Content-Type: application/json');

global $mysqli,$stmt_verify,$stmt_update;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    include 'dbconnect.php';

    $stmt_verify = $mysqli->prepare("UPDATE naumaxiaDB.statuspaixnidiou SET status='not active', last_change=TIMESTAMP, round=-3");
    $stmt_verify->execute();

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
