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

    <!-- Styles -->
    <link href="styles/bootstrap.css" rel="stylesheet">
    <link href="styles/custom.css" rel="stylesheet">
    <link href="styles/jquery-ui.css" rel="stylesheet">

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

<script
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAAKHibq7dwe5Hbp0qmxrDRzzPVeQuwq8Y&libraries=places&callback=initMap"
    async defer></script>


<div class="container">
    <div id="map" class="col-xs-12 col-sm-6 col-md-8">
    </div>
    <div id="search_driver_div" class="col-xs-6 col-md-4" style=" height: 100%">
        <div id="searchDriverBox">
            <form id="signup" method="post" action="php/searchDriver.php">
                <h1 class="h4" style="font-weight: bold">Search Driver</h1>

                <input name="source_address" id="source_address" type="text"
                       placeholder="Enter the address of pickUp"
                       autofocus="autofocus" required="required" class="input"/>

                <input name="destination_address" id="destination_address" type="text"
                       placeholder="Enter the address of drop"
                       required="required" class="input"/>

                <label for="radioTruckType" class="labelCustom">Select Truck Type</label>

                <div id="radioGroupCustom" class="radio" title="Max Capacity: 1,000 lbs">
                    <label class="radio-inline">
                        <input type="radio" name="truckTypeRadioInlineOptions" id="smallTruckType"
                               value="small" checked="checked">Small
                    </label>

                    <label class="radio-inline" title="Max Capacity: 4,000 lbs">
                        <input type="radio" name="truckTypeRadioInlineOptions" id="mediumTruckType"
                               value="medium">Medium
                    </label>

                    <label class="radio-inline" title="Max Capacity: 8,000 lbs">
                        <input type="radio" name="truckTypeRadioInlineOptions" id="largeTruckType"
                               value="large">Large
                    </label>
                </div>

                <label class="labelCustom" for="radioGroupCustom" title="Packaging charges are
                dependent on the type of truck you select">Include Packaging?</label>

                <div id="radioGroupCustom" class="radio">
                    <label class="radio-inline">
                        <input type="radio" name="isPackagingIncludeGroup" id="yesPackagingInclude"
                               value="small">Yes
                    </label>

                    <label class="radio-inline">
                        <input type="radio" name="isPackagingIncludeGroup" id="noPackagingInclude"
                               value="medium" checked="checked">No
                    </label>
                </div>

                <label class="labelCustom form-inline"> Range to find trucks: </label>

                <div id="rangeSlider" disabled="true" class="labelCustom" style="margin-top: 7px;"></div>

                <input type="submit" value="Search" class="inputButton" style="font-weight: bold; font-size: large"/>

            </form>
        </div>
    </div>


</div>


<!--Core JavaScripts-->
<script src="scripts/bootstrap.min.js"></script>
<script src="scripts/jquery.min.js"></script>
<script src="scripts/googlemap.js"></script>
<script src="scripts/jquery-ui.js"></script>
<script>
    $(function () {
        $(document).tooltip();
    });
    var currentSliderValue = 1;
    var tooltip = $('<div id="tooltip" />').css({
        position: 'absolute',
        bottom: -25,
        left: -17
    }).hide();
    tooltip.css("background-color", "#ED4923");
    tooltip.css("width", "50px");
    tooltip.css("height", "auto");
    tooltip.css("padding", "3px");
    tooltip.css("line-height", "20px");
    tooltip.css("text-align", "center");
    tooltip.css("vertical-align", "middle");
    tooltip.text(currentSliderValue + " mi");
    $("#rangeSlider").slider({
        value: 1,
        range: "min",
        min: 1,
        max: 6,
        step: 0.1,
        slide: function (event, ui) {
            currentSliderValue = ui.value;
            tooltip.text(ui.value + " mi");
            drawCircle(currentSliderValue / 2);
        },
        change: function (event, ui) {
        }
    }).find(".ui-slider-handle").append(tooltip).hover(function () {
        tooltip.show()
    }, function () {
        tooltip.hide()
    });

</script>

</body>
</html>