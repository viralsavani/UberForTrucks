<?php
require_once('GeoUtil.php');

$centerLat = 33.78792298;
$centerLng = -118.177925;

$userLat = 33.745903;
$userLng = -118.177925;

$radius = 5000;


$isInRange = GeoUtil::isInRange($centerLat, $centerLng, $userLat, $userLng, $radius);
var_dump($isInRange);
print_r(error_get_last());