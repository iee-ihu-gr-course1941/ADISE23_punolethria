<?php

header('Content-Type: application/json');

global $mysqli,$stmt_verify,$stmt_update;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    include 'dbconnect.php';

    $updateStatusData = json_decode(file_get_contents('php://input'), true);

    $token = $updateStatusData['id'];

    $stmt_verify = $mysqli->prepare("SELECT etiketaPaikth FROM naumaxiaDB.paiktes WHERE idPaikth = ? ");
    $stmt_verify->bind_param("s", $token);
    $stmt_verify->execute();
    $stmt_verify->store_result();
    $stmt_verify->bind_result($etiketaPaikth);
    $stmt_verify->fetch();

    $stmt_update = $mysqli->prepare("UPDATE naumaxiaDB.statuspaixnidiou SET round = round + 1");
    $stmt_update->execute();

    $stmt_verify_1 = $mysqli->prepare("SELECT round FROM naumaxiaDB.statuspaixnidiou");
    $stmt_verify_1->execute();
    $res = $stmt_verify_1->get_result();
    $result = $res->fetch_row();
    $updateStatusData['round'] = $result;
    $updateStatusData['id'] = $etiketaPaikth;

    if($result> -3 && $result < 1){
        $stmt_update_1 = $mysqli->prepare("UPDATE naumaxiaDB.statuspaixnidiou SET status = 'initialized'");
        $stmt_update_1->execute();
        $stmt_lose = $mysqli->prepare("SELECT result FROM naumaxiaDB.statuspaixnidiou");
        $stmt_lose->execute();
        $stmt_lose->store_result();
        $stmt_lose->bind_result($gameResult);
        $stmt_lose->fetch();
        if($gameResult != NULL){
            $updateStatusData['end_of_game'] = true;
            $stmt_reset = $mysqli->prepare("UPDATE naumaxiaDB.statuspaixnidiou SET result=NULL");
            $stmt_reset->execute();
            if(strcmp($etiketaPaikth,"friendly")==0){
                $updateStatusData['winner'] = "hostile";
            }else{
                $updateStatusData['winner'] = "friendly";
            }
        }
    }else if($result == 1){
        $stmt_update = $mysqli->prepare("UPDATE naumaxiaDB.statuspaixnidiou SET status = 'active'");
        $stmt_update->execute();
    }else if($result>1){
        if(strcmp($etiketaPaikth,"friendly")==0){
            $sql_check_winner_ss = 'SELECT * FROM naumaxiaDB.foeboard  where content = 1';
        }
        else{
            $sql_check_winner_ss = 'SELECT * FROM naumaxiaDB.friendlyboard  where content = 1';    
        }
        $sql_check_winner = $mysqli->prepare($sql_check_winner_ss);
        $sql_check_winner->execute();
        $sql_check_winner->store_result();
        if ($sql_check_winner->num_rows === 0) {
            $updateStatusData['end_of_game'] = true;
            if(strcmp($etiketaPaikth,"friendly")==0){
                $stmt_update = $mysqli->prepare("UPDATE naumaxiaDB.statuspaixnidiou SET status = 'ended', result='friend'");
                $stmt_update->execute();
            }else{
                $stmt_update = $mysqli->prepare("UPDATE naumaxiaDB.statuspaixnidiou SET status = 'ended', result='foe'");
                $stmt_update->execute();
            }
        }
    }

    $modified_json_data = json_encode($updateStatusData, JSON_PRETTY_PRINT);

    echo $modified_json_data;
}
?>
