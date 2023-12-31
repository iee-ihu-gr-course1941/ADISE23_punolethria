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
    $stmt_update->close();

    $stmt_verify_1 = $mysqli->prepare("SELECT round FROM naumaxiaDB.statuspaixnidiou");
    $stmt_verify_1->execute();
    $res = $stmt_verify_1->get_result();
    $result = $res->fetch_row();
    $stmt_verify_1->close();
    $updateStatusData['round'] = $result;
    $updateStatusData['id'] = $etiketaPaikth;

    if($result[0]> -3 && $result[0] < 1){
        $stmt_update_1 = $mysqli->prepare("UPDATE naumaxiaDB.statuspaixnidiou SET game_status = 'initialized'");
        $stmt_update_1->execute();
        $stmt_update_1->close();
        $stmt_lose = $mysqli->prepare("SELECT result FROM naumaxiaDB.statuspaixnidiou");
        $stmt_lose->execute();
        $stmt_lose->store_result();
        $stmt_lose->bind_result($gameResult);
        $stmt_lose->fetch();
        $stmt_lose->close();
        if($gameResult != NULL){
            $updateStatusData['end_of_game'] = true;
            $stmt_reset = $mysqli->prepare("UPDATE naumaxiaDB.statuspaixnidiou SET result=NULL");
            $stmt_reset->execute();
            $stmt_reset->close();
            if(strcmp($etiketaPaikth,"friendly")==0){
                $updateStatusData['winner'] = $gameResult;
            }else{
                $updateStatusData['winner'] = $gameResult;
            }
        }
    }else if($result[0] == 1){
        $stmt_update_2 = $mysqli->prepare("UPDATE naumaxiaDB.statuspaixnidiou SET game_status = 'active'");
        $stmt_update_2->execute();
        $stmt_update_2->close();
    }if($result[0] > 1){
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
                $updateStatusData["winner"] = "friendly";
                $stmt_update_3 = $mysqli->prepare("UPDATE naumaxiaDB.statuspaixnidiou SET game_status = 'ended', result='friendly '");
                $stmt_update_3->execute();
                $stmt_update_3->close();
            }else{
                $updateStatusData["winner"] = "hostile";
                $stmt_update_3 = $mysqli->prepare("UPDATE naumaxiaDB.statuspaixnidiou SET game_status = 'ended', result='foe'");
                $stmt_update_3->execute();
                $stmt_update_3->close();
            }
        }
        $sql_check_winner->close();
    }

    $modified_json_data = json_encode($updateStatusData, JSON_PRETTY_PRINT);

    echo $modified_json_data;
}
?>
