<?php
header('Content-Type: application/json');

global $mysqli;



$exists = false;

function assignTag() {
    $tags = array('friend', 'foe');
    $randomIndex = array_rand($tags);
    return $tags[$randomIndex];
}


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    include 'dbconnect.php';

    $data = json_decode(file_get_contents('php://input'), true);

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

    // Elegxos an to onoma yparxei hdh
    if ($num > 0) {
        $exists = true;
    }
    else if ($num == 0) {
        if (($password == $passwordRepeat) && !$exists) {

            $hash = password_hash($password, PASSWORD_DEFAULT);

            // Hashing
            $stmt = $mysqli->prepare("INSERT INTO naumaxiaDB.paiktes (etiketaPaikth, usernamePaikth, passwordPaikth) VALUES (?, ?, ?)");
            $stmt->bind_param("sss", $playerTag, $username, $hash);
            $stmt->execute();

            if ($stmt->affected_rows > 0) {
                $response = array("status" => "success", "message" => "Η εγγραφή πραγματοποιήθηκε με επιτυχία!");
                $showAlert = true;
            } else {
                $response = array("status" => "error", "message" => "Σφάλμα εγγραφής!");
            }
            echo json_encode($response);
        }
    }

    // Close the statement
    $stmt->close();
}
?>