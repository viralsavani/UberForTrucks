<?php
require_once('Database.php');
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $dbInstance = Database::getDBInstance();
    $dbConnection = $dbInstance->getDBConnection();

    $username = $_POST['signin_username'];
    $password = $_POST['signin_password'];

    $query = "SELECT emailId FROM user_login WHERE
                username = '$username' AND password = '$password'";
    $result = mysqli_query($dbConnection, $query);

    if (mysqli_num_rows($result) > 0){
        $row = mysqli_fetch_assoc($result);
        $emailId = $row["emailId"];


        $host  = $_SERVER['HTTP_HOST'];
        $uri   = 'UberForTrucks';
        $extra = 'requestTruck.php';
        header('Location:/'.$uri.'/'.$extra.'?username='.$username);

//        echo 'Location: '.$host.'/'.$uri.'/'.$extra;
    }else {
        echo '<h2>Invalid credentials! Click <a href="../index.html">HERE</a> to return to Login Page</h2>';
    }
}