<?php
$user='root';
$pass='000000';
$host='localhost';
$db = 'naumaxiaDB';


$mysqli = new mysqli($host, $user, $pass, $db,null,'/home/student/iee/2019/iee2019057/mysql/run/mysql.sock
');
if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: (" . 
    $mysqli->connect_errno . ") " . $mysqli->connect_error;
}?>