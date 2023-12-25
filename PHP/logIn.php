<?php
header('Content-Type: application/json');

global $mysqli;

session_start();
$session_id = session_id();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    include 'dbconnect.php';

    $logInData = json_decode(file_get_contents('php://input'), true);

    $username = $logInData['playerUsername'];
    $password = $logInData['playerPassword'];

    $stmt = $mysqli->prepare("SELECT usernamePaikth, passwordPaikth FROM naumaxiaDB.paiktes WHERE usernamePaikth = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();
    $stmt->bind_result($dbUsername, $hashedPassword);
    $stmt->fetch();

    if ($stmt->num_rows == 1 && password_verify($password, $hashedPassword)) {
        $_SESSION['login_user'] = $dbUsername;
        $response = array("status" => "success", "message" => "Η σύνδεση πραγματοποιήθηκε με επιτυχία!");
        
    } else {
        $response = array("status" => "error", "message" => "Λάθος όνομα χρήστη ή κωδικός πρόσβασης!");
        
    }

    echo json_encode($response);
    
    $stmt->close();
}
?>