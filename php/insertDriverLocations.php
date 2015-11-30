<?php
require_once('Database.php');

$locationLatArray = $_POST['latArray'];
$locationLngArray = $_POST['lngArray'];
$string = "";

$dbInstance = Database::getDBInstance();
$dbConnection = $dbInstance->getDBConnection();

$query = "SELECT driver_id FROM driver_track";
$result = mysqli_query($dbConnection, $query);

if (mysqli_num_rows($result) > 0){
    $i = 0; // Counter for lat/lngArray
    while($row = mysqli_fetch_assoc($result)){
        $driver_id = $row["driver_id"];
        $query = "UPDATE driver_track SET latitude = '$locationLatArray[$i]',
                    longitude = '$locationLngArray[$i]' WHERE driver_id = '$driver_id'";

        if(!mysqli_query($dbConnection, $query)){
            echo "Problem: ".$query;
        }
        $i++;
    }
    echo $i-1;
}
