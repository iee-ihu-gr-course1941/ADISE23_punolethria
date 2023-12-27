<?php

session_start();

header('Content-Type: application/json');

global $mysqli;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    include 'dbconnect.php';

    $logInData = json_decode(file_get_contents('php://input'), true);

    $username = $logInData['playerUsername'];
    $password = $logInData['playerPassword'];
    $token = $logInData['playerToken'];

    $stmt = $mysqli->prepare("UPDATE naumaxiaDB.paiktes SET idPaikth = ? WHERE usernamePaikth = ?");
    $stmt->bind_param("ss", $token, $username);
    $stmt->execute();

    $stmt = $mysqli->prepare("SELECT * FROM naumaxiaDB.paiktes WHERE usernamePaikth = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();
    $stmt->bind_result($etiketaPaikth, $usernamePaikth,$passwordPaikth,$idPaikth);
    $stmt->fetch();

    echo json_encode($response);
    
    $stmt->close();
        exit;
}
?>