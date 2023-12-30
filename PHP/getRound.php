<?php

header('Content-Type: application/json');

global $mysqli,$stmt_verify,$stmt_select;
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    include 'dbconnect.php';
    
    $getRoundData = json_decode(file_get_contents('php://input'), true);
    
    $stmt_verify_1 = $mysqli->prepare("SELECT round FROM naumaxiaDB.statuspaixnidiou");
    $stmt_verify_1->execute();
    $res = $stmt_verify_1->get_result();
    $result = $res->fetch_row();
    $getRoundData['round'] = $result;

    $modified_json_data = json_encode($getRoundData, JSON_PRETTY_PRINT);

    echo $modified_json_data;
    // Close both statements
    $stmt_verify->close();
    
}
?>