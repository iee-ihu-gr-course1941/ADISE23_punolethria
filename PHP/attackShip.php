<?php

header('Content-Type: application/json');

global $mysqli,$stmt_verify,$stmt_select;
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    include 'dbconnect.php';
    $message = "hello!";
    $attackShipData = json_decode(file_get_contents('php://input'), true);

    $sthlh = $attackShipData['sthlh'];
    $grammh = $attackShipData['grammh'];
    $token = $attackShipData['id'];

    $stmt_verify = $mysqli->prepare("SELECT etiketaPaikth FROM naumaxiaDB.paiktes WHERE idPaikth = ? ");
    $stmt_verify->bind_param("s", $token);
    $stmt_verify->execute();
    $stmt_verify->store_result();
    $stmt_verify->bind_result($etiketaPaikth);
    $stmt_verify->fetch();

    if ($stmt_verify->num_rows === 0) {
        $response = array("status" => "error", "message" => "Κάτι δεν πήγε καλά!");

    } else {
        
        if(strcmp($etiketaPaikth,"friend")==0){
            $stmt_select = $mysqli->prepare("SELECT content FROM naumaxiaDB.foeboard WHERE grammh = ?, sthlh = ? ");
            $stmt_select->bind_param("ii", $grammh, $sthlh);
            $stmt_select->execute();
            $stmt_select->store_result();
            $stmt_select->bind_result($content);
            $stmt_select->fetch();
            echo $content;
            $stmt_select->close();
        }
        else{
            $stmt_select = $mysqli->prepare("SELECT content FROM naumaxiaDB.friendlyboard WHERE grammh = ?, sthlh = ? "); 
            $stmt_select = $mysqli->prepare("SELECT content FROM naumaxiaDB.foeboard WHERE grammh = ?, sthlh = ? ");
            $stmt_select->bind_param("ii", $grammh, $sthlh);
            $stmt_select->execute();
            $stmt_select->store_result();
            $stmt_select->bind_result($content);
            $stmt_select->fetch();
            echo $content;
            $stmt_select->close();
        }
    }
    
    

    // Close both statements
    $stmt_verify->close();
    
}
?>