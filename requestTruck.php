<?php
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Request Driver</title>

    <!-- Bootstrap -->
    <link href="styles/bootstrap.css" rel="stylesheet">
    <link href="styles/custom.css" rel="stylesheet">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>
<body>
<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<!-- Include all compiled plugins (below), or include individual files as needed -->
<script src="scripts/bootstrap.min.js"></script>

<script src="scripts/googlemap.js"></script>
<script
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAAKHibq7dwe5Hbp0qmxrDRzzPVeQuwq8Y&libraries=places&callback=initMap"
    async defer></script>

<div class="container">


    <!--    border: dotted medium #ff5b3f;-->
    <div id="map" class="col-xs-12 col-sm-6 col-md-8">
    </div>

    <!--    border: dotted medium #3a1fff;-->
    <div id="search_driver_div" class="col-xs-6 col-md-4" style=" height: 100%">
        <div id="searchDriverBox">
            <form id="signup" method="post" action="php/signup.php">
                <h1 class="h4" style="font-weight: bold">Search Driver</h1>

                <input name="source_address" id="source_address" type="text" placeholder="Enter the address of pickUp"
                       autofocus="autofocus" required="required" class="input"/>

                <input name="destination_address" id="destination_address" type="text"
                       placeholder="Enter the address of drop"
                       required="required" class="input"/>

                <label for="radioTruckType" id="labelCustom">Select Truck Type</label>

                <div id="radioTruckType" class="radio">
                    <label class="radio-inline">
                        <input type="radio" name="truckTypeRadioInlineOptions" id="smallTruckType"
                               value="small">Small
                    </label>

                    <label class="radio-inline">
                        <input type="radio" name="truckTypeRadioInlineOptions" id="mediumTruckType"
                               value="medium">Medium
                    </label>

                    <label class="radio-inline">
                        <input type="radio" name="truckTypeRadioInlineOptions" id="largeTruckType"
                               value="large">Large
                    </label>
                </div>





<!--                <input name="signup_password" type="password" placeholder="Choose a password" required="required"-->
<!--                       class="input pass"/>-->
<!---->
<!--                <input name="signup_address" type="text" placeholder="Enter address" required="required"-->
<!--                       class="input"/>-->
<!---->
<!--                <input name="signup_phonenumber" type="text" placeholder="Enter phone number" required="required"-->
<!--                       class="input"/>-->
<!---->
<!--                <input type="submit" value="Sign Up" class="inputButton" style="font-weight: bold"/>-->

            </form>
        </div>
    </div>


</div>


</body>
</html>
