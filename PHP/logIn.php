<?php

header('Content-Type: application/json');

global $mysqli, $stmt_update;

if ($_SERVER["REQUEST_METHOD"] == "PUT") {
    include 'dbconnect.php';

    $logInData = json_decode(file_get_contents('php://input'), true);

    $username = $logInData['playerUsername'];
    $password = $logInData['playerPassword'];
    $token = $logInData['playerToken'];

    //$hash = password_hash($password, PASSWORD_DEFAULT);

    // Verify existing credentials before updating
    $stmt_verify = $mysqli->prepare("SELECT idPaikth FROM naumaxiaDB.paiktes WHERE usernamePaikth = ? ");
    $stmt_verify->bind_param("s", $username);
    $stmt_verify->execute();
    $stmt_verify->store_result();

    if ($stmt_verify->num_rows === 0) {
        $response = array("status" => "error", "message" => "Invalid username or password");

    } else {
        // Initialize $stmt_update outside the if block
        $stmt_update = $mysqli->prepare("UPDATE naumaxiaDB.paiktes SET idPaikth = ? WHERE usernamePaikth = ? ");
        $stmt_update->bind_param("ss", $token, $username);
        $stmt_update->execute();

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