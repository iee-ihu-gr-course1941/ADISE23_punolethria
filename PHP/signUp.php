<?php
header('Content-Type: application/json');

global $mysqli;

$exists = false;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    include 'dbconnect.php';

    $data = json_decode(file_get_contents('php://input'), true);

    $playerTag;
    $username = $data['playerUsername'];
    $password = $data['playerPassword'];
    $passwordRepeat = $data['playerPasswordRepeat'];
    $token = $data['playerToken'];

    $stmt_verify_role = $mysqli->prepare("SELECT etiketaPaikth FROM naumaxiaDB.paiktes");
    $stmt_verify_role->execute();
    $stmt_verify_role->store_result();
    $stmt_verify_role->bind_result($etiketaPaikth);
    $stmt_verify_role->fetch();
    $numExistingRoles = $stmt_verify_role->num_rows;
    $stmt_verify_role->close();

    $stmt = $mysqli->prepare("SELECT * FROM paiktes WHERE usernamePaikth = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();
    $num = $stmt->num_rows;
    $stmt->close();

    if ($num > 0) {
        $exists = true;
        http_response_code(400);
        $response = array("status" => "error", "message" => "Αυτό το username χρησιμοποιείται ήδη!");
        echo json_encode($response);
        exit();
    } else if ($num == 0) {
        if(strcmp($password, $passwordRepeat) == 0 && !$exists) {
            if ($numExistingRoles == 0) {
                $playerTag = "friendly";   
            } else {
                $playerTag = "hostile";
            }
            if ($numExistingRoles == 2) {
                http_response_code(400);
                $response = array("status" => "error", "message" => "Ο μέγιστος όρος εγγραφών έχει καλυφθεί!");
                echo json_encode($response);
                exit();
            }
            
            $hash = password_hash($password, PASSWORD_DEFAULT);

            $stmt_insert = $mysqli->prepare("INSERT INTO naumaxiaDB.paiktes (etiketaPaikth, usernamePaikth, passwordPaikth, idPaikth) VALUES (?, ?, ?, ?)");
            $stmt_insert->bind_param("ssss", $playerTag, $username, $hash, $token);
            $stmt_insert->execute();

            if ($stmt_insert->affected_rows > 0) {
                $response = array("status" => "success", "message" => "Η εγγραφή πραγματοποιήθηκε με επιτυχία!");
                echo json_encode($response);
            } else {
                $response = array("status" => "error", "message" => "Λάθος κατά την εγγραφή!");
                echo json_encode($response);
            }

            $stmt_insert->close();
        }
    }

    $stmt->close();
}
?>

