<?php

require_once('Database.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $dbInstance = Database::getDBInstance();
    $dbConnection = $dbInstance->getDBConnection();

    $username = $_POST['signup_username'];
    $emailId = $_POST['signup_email'];
    $password = $_POST['signup_password'];
    $address = $_POST['signup_address'];
    $phoneNumber = $_POST['signup_phonenumber'];


    // Insert the userData in user_details
    $query = "INSERT INTO user_details (emailId, name, address, phoneNumber) VALUES
                  ('$emailId', '$username', '$address', '$phoneNumber')";
    $userDetailFlag = mysqli_query($dbConnection, $query);

    // If the insertion was successful the enter the username and password and emailId in user_login table
    if ($userDetailFlag){
        $query = "INSERT INTO user_login (username, password, emailId) VALUES
                      ('$username', '$password', '$emailId')";
    }
    $userLoginFlag = mysqli_query($dbConnection, $query);


    $host  = $_SERVER['HTTP_HOST'];
    $uri   = 'UberForTrucks';
    $extra = 'index.html';

    if ($userDetailFlag && $userLoginFlag){
        echo '<h2>Account created successfully. You will be re-directed to LoginScreen in 3 seconds...</h2>';
        header('refresh:3; url=/'.$uri.'/'.$extra);
    }else{
        echo '<h2>Account creation unsuccessful. Click <a href="../index.html">HERE</a> to return to Registration Page</h2>';
    }
}