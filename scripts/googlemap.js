var source_place_id = null;
var destination_place_id = null;
var map;
var centerOfCircle;
var rangeCircle;
var sourceMarker;
var destinationMarker;
var randomLatlngArray = [];
var markers = [];


// This method is called as callback from the url
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        mapTypeControl: false,
        center: {lat: 0, lng: 0},
        streetViewControl: false,
        zoom: 13
    });
    var infoWindow = new google.maps.InfoWindow({});

    // Get user current location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            centerOfCircle = pos;

            if (initMarker != undefined){
                initMarker.setMap(null);
            }

            var initMarker = new google.maps.Marker({
                position: centerOfCircle,
                map: map,
                animation: google.maps.Animation.DROP,
                title: "Pick up Address"
            });

            map.setCenter(pos);

            //TODO Address is undefined
            // As we found the current location. Fill the source address with address at this point
            var input_sourceAddress = /** @type {!HTMLInputElement} */(document.getElementById('source_address'));
            geocoder = function () {
                var geoCoder = new google.maps.Geocoder;
                var address = "";
                var location = {lat: parseFloat(pos.lat), lng: parseFloat(pos.lng)};
                geoCoder.geocode({'location': location}, function (results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                        if (results[1]) {
                            address = results[1].formatted_address;
                            input_sourceAddress.value = address;
                        } else {
                            alert("No result found in GeoCoder");
                        }
                    } else {
                        alert("GeoCoder failed with result code:" + status);
                    }
                });
            };
            geocoder();

        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
        alert("Please select to allow location");
    }

    autoCompleteSourceAddress(map);
    autoCompleteDestinationAddress(map);
}

// Method for autoComplete source address
function autoCompleteSourceAddress(map) {

    var input_sourceAddress = /** @type {!HTMLInputElement} */(document.getElementById('source_address'));
    var autocomplete_sourceAddress = new google.maps.places.Autocomplete(input_sourceAddress);
    autocomplete_sourceAddress.bindTo('bounds', map);

    // Add listener to source address textbox
    autocomplete_sourceAddress.addListener('place_changed', function () {
        var place = autocomplete_sourceAddress.getPlace();
        if (!place.geometry) {
            window.alert("Error in address");
            return;
        }
        // Store the place selected by user in source_place_id. It will be used for
        // navigation
        source_place_id = place.place_id;
        expandViewportToFitPlace(map, place);

        // Store the centerOfCircle i.e latLng of source address
        centerOfCircle = place.geometry.location;

        sourceMarker = new google.maps.Marker({
            position: centerOfCircle,
            map: map,
            animation: google.maps.Animation.DROP,
            title: "Pick up Address"
        });
    });


}

// Method for autoComplete destination address
function autoCompleteDestinationAddress(map) {
    var input_destinationAddress = /** @type {!HTMLInputElement} */(document.getElementById('destination_address'));
    var autocomplete_destinationAddress = new google.maps.places.Autocomplete(input_destinationAddress);
    autocomplete_destinationAddress.bindTo('bounds', map);

    // Add listener to source address textbox
    autocomplete_destinationAddress.addListener('place_changed', function () {
        var place = autocomplete_destinationAddress.getPlace();
        if (!place.geometry) {
            window.alert("Error in address");
            return;
        }
        // Store the place selected by user in destination_place_id. It will be used for
        // navigation
        destination_place_id = place.place_id;


        if (destinationMarker != undefined){
            destinationMarker.setMap(null);
        }

        var destinationMarker = new google.maps.Marker({
            position: place.geometry.location,
            map: map,
            animation: google.maps.Animation.DROP,
            title: "Destination Address"
        });
    });
}

// Method to hand error if user does not allow location
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setMap(map);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}

// Method to draw circle on map
function drawCircle(radius) {
    if (rangeCircle != undefined) {
        rangeCircle.setMap(null);
    }
    rangeCircle = new google.maps.Circle({
        strokeColor: '#000000',
        strokeOpacity: 0.8,
        clickable: false,
        strokeWeight: 1.5,
        fillOpacity: 0.00,
        map: map,
        center: centerOfCircle,
        radius: radius * 1609.34 /* miles to meters */
    });
}

// Returns the current range selected by user in meters
function getRadiusMeters() {
    if (rangeCircle != undefined) {
        return rangeCircle.getRadius();
    } else {
        return null;
    }
}

function getCenterOfCircle() {
    if (centerOfCircle != undefined) {
        return centerOfCircle;
    } else {
        return null;
    }
}

// Geocoding method latLng->Address
function getAddressFromLatLng(position) {
    var geoCoder = new google.maps.Geocoder;
    var address = "";
    var location = {lat: parseFloat(position.lat), lng: parseFloat(position.lng)};
    //alert(location);
    geoCoder.geocode({'location': location}, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            if (results[1]) {
                address = results[1].formatted_address;
                return address;
            } else {
                alert("No result found in GeoCoder");
            }
        } else {
            alert("GeoCoder failed with result code:" + status);
        }
    });
}

// Get latLng from placeID
function getLatlngFromPlaceId(place_id) {
    var geocoder = new google.maps.Geocoder;
    geocoder.geocode({'placeId': place_id}, function (results, status) {
        if (results[0]) {
            return results[0].geometry.location;
        }
    });
}

function getLatLngBound(map) {
    return map.getBounds();
}

function generateRandomLatLng() {
    var center = map.getCenter();
    var radius = 9999/2;

    randomLatlngArray = generateRandomPoints(center, radius, 25);

    randomLatlngArray = snapToRoad(randomLatlngArray);

    var latArray = [];
    var lngArray = [];

    for (var i = 0; i < randomLatlngArray.length; i++) {
        latArray.push(randomLatlngArray[i].lat);
        lngArray.push(randomLatlngArray[i].lng);
    }

    $.post("php/insertDriverLocations.php", {latArray: latArray, lngArray: lngArray}, function (results) {
        randomLatlngArray.slice(0, results);
    });
    drawMarkers();
}

function snapToRoad(latLngArray) {
    for (var i = 0; i < latLngArray.length; i++) {
        $.get('https://roads.googleapis.com/v1/snapToRoads', {
            interpolate: false,
            key: 'AIzaSyAAKHibq7dwe5Hbp0qmxrDRzzPVeQuwq8Y',
            path: latLngArray.pop()
        }, function (data) {
            latLngArray.push({
                lat: data.snappedPoints[0].location.latitude,
                lng: data.snappedPoints[0].location.longitude
            });
        });
    }
    return latLngArray;
}

function drawMarkers() {
    var latLngArray = randomLatlngArray;

    removeMarkers();
    //TODO: change icon-base
    var iconBase = 'http://localhost:63342/UberForTrucks/images/';
    for (var i = 0; i < latLngArray.length; i++) {
        var position = {lat: latLngArray[i].lat, lng: latLngArray[i].lng};
        markers[i] = new google.maps.Marker({
            position: position,
            map: map,
            animation: google.maps.Animation.DROP,
            icon: iconBase + 'car_marker.png'
        });
    }
}

function removeMarkers() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
}
// Method to focus map on the place found
function expandViewportToFitPlace(map, place) {
    if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
        map.setCenter(place.geometry.location);
    } else {
        map.setCenter(place.geometry.location);
        map.setZoom(13);
    }
}














// Search Driver
function searchDriver(){
    var input_destinationAddress = /** @type {!HTMLInputElement} */(document.getElementById('destination_address'));
    var truckTypeGroup = document.getElementsByName('truckTypeRadioInlineOptions');
    var isPackagingGroup = document.getElementsByName('isPackagingIncludeGroup');
    var range = getRadiusMeters();
    if (input_destinationAddress.value == ""){
        alert("Enter Destination Address");
    }else {
        var truckType;
        for(var i = 0; i < truckTypeGroup.length; i++){
            if(truckTypeGroup[i].checked){
                truckType = truckTypeGroup[i].value;
            }
        }

        var isPackaging;
        for(i = 0; i < isPackagingGroup.length; i++){
            if(isPackagingGroup[i].checked){
                isPackaging = isPackagingGroup[i].value;
            }
        }
    }

}