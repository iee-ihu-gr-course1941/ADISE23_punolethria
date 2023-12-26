<?php

session_start();

header('Content-Type: application/json');

global $mysqli;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    include 'dbconnect.php';

    $logInData = json_decode(file_get_contents('php://input'), true);

    $username = $logInData['playerUsername'];
    $password = $logInData['playerPassword'];

    $stmt = $mysqli->prepare("SELECT * FROM naumaxiaDB.paiktes WHERE usernamePaikth = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();
    $stmt->bind_result($etiketaPaikth, $usernamePaikth,$passwordPaikth,$idPaikth);
    $stmt->fetch();

    if ($stmt->num_rows == 1 && password_verify($password, $passwordPaikth)) {
        $_SESSION['user_etiketa'] = $etiketaPaikth;
        $_SESSION['user_name'] = $usernamePaikth;
        $_SESSION['user_password'] = $passwordPaikth;
        $_SESSION['user_id'] = $idPaikth;
        
        $response = array("status" => "success", "message" => "Η σύνδεση πραγματοποιήθηκε με επιτυχία!", "user_id" => $_SESSION['user_id']);
    } else {
        $response = array("status" => "error", "message" => "Λάθος όνομα χρήστη ή κωδικός πρόσβασης!");
    }

    echo json_encode($response);
    
    $stmt->close();
        exit;
}
?>