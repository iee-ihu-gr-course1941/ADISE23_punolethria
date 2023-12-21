<?php
header('Content-Type: application/json');

global $mysqli;

$showAlert = false;
$showError = false;
$exists = false;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    include_once 'dbconnect.php';

    $data = json_decode(file_get_contents('php://input'), true);

    function assignTag() {
        $tags = array('friend', 'foe');
        $randomIndex = array_rand($tags);
        return $tags[$randomIndex];
    }
    
    $playerTag = assignTag();
    $username = $data['playerUsername'];
    $password = $data['playerPassword'];
    $passwordRepeat = $data['playerPasswordRepeat'];

    // Prepared Statement
    $stmt = $mysqli->prepare("SELECT * FROM paiktes WHERE usernamePaikth = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();
    $num = $stmt->num_rows;

    // Check if the username is already present
    if ($num > 0) {
        $exists = true;
    }
    else if ($num == 0) {
        if (($password == $passwordRepeat) && !$exists) {

            $hash = password_hash($password, PASSWORD_DEFAULT);

            // Password Hashing is used here.
            $stmt = $mysqli->prepare("INSERT INTO naumaxiaDB.paiktes (etiketaPaikth, usernamePaikth, passwordPaikth) VALUES (?, ?, ?)");
            $stmt->bind_param("sss", $playerTag, $username, $hash);
            $stmt->execute();

            if ($stmt->affected_rows > 0) {
                $showAlert = true;
            } else {
                $showError = "Error in inserting record.";
            }
        } else {
            $showError = "Passwords do not match";
        }
    }

    // Close the statement
    $stmt->close();
}
?>