<?php
header('Content-Type: application/json');

global $mysqli;

$showAlert = false;
$showError = false;
$exists = false;
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    include 'dbconnect.php';

    $logInData = json_decode(file_get_contents('php://input'), true);

    $username = $logInData['playerUsername'];
    $password = $logInData['playerPassword'];

    $stmt = $DB->prepare("SELECT usernamePaikth, passwordPaikth FROM naumaxiaDB.paiktes WHERE usernamePaikth = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();
    $stmt->bind_result($dbUsername, $hashedPassword);
    $stmt->fetch();

    if ($stmt->num_rows == 1 && password_verify($password, $hashedPassword)) {
        $_SESSION['login_user'] = $dbUsername;
        $response = array("status" => "success", "message" => "Η σύνδεση πραγματοποιήθηκε με επιτυχία!");
        $showAlert = true;
    } else {
        $response = array("status" => "error", "message" => "Λάθος όνομα χρήστη ή κωδικός πρόσβασης!");
        $showError = "Incorrect username or password.";
    }

    echo json_encode($response);
    
    $stmt->close();
}
?>