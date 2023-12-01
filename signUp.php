<!DOCTYPE html>
<html>
<?php
    $username=$_POST["username"];
    $password = $_POST["password"];
    $message = $_POST["name"] . "Sent this email" . "\r\n" . $_POST["feedback"] . "Sent from this email address:" . $_POST["email"];
    mail("email@gmail.com", $subject, $message);
    //header("Location: index.html");
?>
Error, please contact Jack at (email@gmail.com) <br>
email: <?php echo $email ?> <br>
subject: <?php echo $subject ?> <br>
message: <?php echo $message ?> <br>
</html>