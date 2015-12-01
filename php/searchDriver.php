<?php
require_once('Database.php');
require_once('GeoUtil.php');

$truckType = $_POST['truckType'];
$isPackaging = $_POST['isPackaging'];
$radius = $_POST['radius'];
$center = $_POST['center'];

$centerPoint = explode(",", $center);
$centerLat = floatval($centerPoint[0]);
$centerLng = floatval($centerPoint[1]);

$dbInstance = Database::getDBInstance();
$dbConnection = $dbInstance->getDBConnection();

$finalResult = "";

$query = "SELECT * FROM driver_track";
$result = mysqli_query($dbConnection, $query);
if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)){
        $lat = $row["latitude"];
        $lng = $row["longitude"];

        if (GeoUtil::isInRange($centerPoint[0], $centerPoint[1],
            $lat, $lng, $radius)){


            // Get the driver details
            $driverId = $row["driver_id"];
            $query = "SELECT * FROM driver_details WHERE driverId = '$driverId'";

            $resultInner = mysqli_query($dbConnection, $query);
            if (mysqli_num_rows($resultInner) > 0){
                $rowInner = mysqli_fetch_assoc($resultInner);
                $driverDetail = $lat.",".
                                $lng.",".
                                $rowInner["driverId"].",".
                                $rowInner["truckRegistrationNumber"].",".
                                $rowInner["name"].",".
                                $rowInner["phoneNumber"].",".
                                $rowInner["isPackaging"].",".
                                $rowInner["rating"];
                $finalResult = $finalResult.$driverDetail.";";
            }
        }
    }
}
echo $finalResult;


