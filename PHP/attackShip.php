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
            $sql = 'select content from naumaxiaDB.foeboard where grammh=? and sthlh=?';
        }
        else{
            $sql = 'select content from naumaxiaDB.friendlyboard where grammh=? and sthlh=?';
        }
        $st = $mysqli->prepare($sql);
        $st->bind_param('ii', $grammh,$sthlh);
        $st->execute();
        $res = $st->get_result();
        $res->fetch_all(MYSQLI_ASSOC);
        if($res == 1){
            $attackShipData['content'] = 1;
        }else{
            $attackShipData['content'] = 0;
        }
        $modified_json_data = json_encode($attackShipData, JSON_PRETTY_PRINT);

        echo $modified_json_data;
    }


    


    // Close both statements
    $stmt_verify->close();
    
}
?>