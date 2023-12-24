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
       
       // username and password sent from form
       $username = $logInData['playerUsername'];
       $password = $logInData['playerPassword'];

       // Using prepared statement to prevent SQL injection
       $stmt = $DB->prepare("SELECT etiketaPaikth FROM naumaxiaDB.paiktes WHERE usernamePaikth = ? AND passwordPaikth = ?");
       $stmt->bind_param("ss", $username, $password);
       $stmt->execute();
       $stmt->store_result();
       $stmt->bind_result($userId, $hashedPassword);
       $stmt->fetch();
       

       if ($stmt->num_rows == 1 && password_verify($password, $hashedPassword)) {
        // Password is correct, log in the user
        $_SESSION['login_user'] = $username;
        $response = array("status" => "success", "message" => "Η σύνδεση πραγματοποιήθηκε με επιτυχία!");
        $showAlert = true;
    } else {
        // Incorrect username or password
        $response = array("status" => "error", "message" => "Λάθος όνομα χρήστη ή κωδικός πρόσβασης!");
        $showError = "Incorrect username or password.";
    }
    
    echo json_encode($response);

       // Close the statement
       $stmt->close();
   }
?>