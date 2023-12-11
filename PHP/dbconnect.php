<?php
$user = 'root';
$pass = '';
$host = 'localhost';
$db = 'naumaxiaDatabase';

$mysqli = new mysqli($host, $user, $pass, $db, null, '/home/student/iee/2019/iee2019057/mysql/run/mysql.sock');

if ($mysqli->connect_errno) {
    die("Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error);
}

// Additional configuration or actions, if needed.
?>