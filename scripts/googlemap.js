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
    var infoWindow = new google.maps.InfoWindow({map: map});

    // Get user current location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            centerOfCircle = pos;

            infoWindow.setPosition(pos);
            infoWindow.setContent('You are here');
            map.setCenter(pos);

            //TODO Address is undefined
            // As we found the current location. Fill the source address with address at this point
            var input_sourceAddress = /** @type {!HTMLInputElement} */(document.getElementById('source_address'));
            geocoder = function(){
                var geoCoder = new google.maps.Geocoder;
                var address = "";
                var location = {lat: parseFloat(pos.lat), lng: parseFloat(pos.lng)};
                geoCoder.geocode({'location': location}, function (results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                        if (results[1]){
                            address = results[1].formatted_address;
                            input_sourceAddress.value = address;
                        }else {
                            alert("No result found in GeoCoder");
                        }
                    }else {
                        alert("GeoCoder failed with result code:" +status);
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
    }

    autoCompleteSourceAddress(map);
    autoCompleteDestinationAddress(map);
}

// Method for autoComplete source address
function autoCompleteSourceAddress(map){

    var input_sourceAddress = /** @type {!HTMLInputElement} */(document.getElementById('source_address'));
    var autocomplete_sourceAddress = new google.maps.places.Autocomplete(input_sourceAddress);
    autocomplete_sourceAddress.bindTo('bounds', map);

    // Add listener to source address textbox
    autocomplete_sourceAddress.addListener('place_changed', function() {
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
    });
}

// Method for autoComplete destination address
function autoCompleteDestinationAddress(map){
    var input_destinationAddress = /** @type {!HTMLInputElement} */(document.getElementById('destination_address'));
    var autocomplete_destinationAddress = new google.maps.places.Autocomplete(input_destinationAddress);
    autocomplete_destinationAddress.bindTo('bounds', map);

    // Add listener to source address textbox
    autocomplete_destinationAddress.addListener('place_changed', function() {
        var place = autocomplete_destinationAddress.getPlace();
        if (!place.geometry) {
            window.alert("Error in address");
            return;
        }
        // Store the place selected by user in destination_place_id. It will be used for
        // navigation
        destination_place_id = place.place_id;
    });
}

// Method to hand error if user does not allow location
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}

// Method to draw circle on map
function drawCircle(radius){
    if (rangeCircle != undefined){
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
function getRadiusMeters(){
    if (rangeCircle != undefined){
        return rangeCircle.getRadius();
    }else {
        return null;
    }
}

function getCenterOfCircle(){
    if (centerOfCircle != undefined){
        return centerOfCircle;
    }else {
        return null;
    }
}

// Geocoding method latLng->Address
function getAddressFromLatLng(position){
    var geoCoder = new google.maps.Geocoder;
    var address = "";
    var location = {lat: parseFloat(position.lat), lng: parseFloat(position.lng)};
    //alert(location);
    geoCoder.geocode({'location': location}, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            if (results[1]){
                address = results[1].formatted_address;
                return address;
            }else {
                alert("No result found in GeoCoder");
            }
        }else {
            alert("GeoCoder failed with result code:" +status);
        }
    });
}

// Get latLng from placeID
function getLatlngFromPlaceId(place_id){
    var geocoder = new google.maps.Geocoder;
    geocoder.geocode({'placeId': place_id}, function(results, status) {
        if (results[0]) {
            return results[0].geometry.location;
        }
    });
}

function getLatLngBound(map){
    return map.getBounds();
}

function generateRandomLatLng(){
    var northEast = getLatLngBound(map).getNorthEast();
    var southWest = getLatLngBound(map).getSouthWest();

    // Lat->15, lng->14
    var chance = new Chance();

    for (var i = 0; i < 20; i++){
        var latLng = {lat: parseFloat(chance.latitude({min: southWest.lat(), max: northEast.lat()})),
            lng: parseFloat(chance.longitude({min: southWest.lng(), max: northEast.lng()}))};
        randomLatlngArray.push(latLng);
    }


    snapToRoad(randomLatlngArray);
    drawMarkers(randomLatlngArray);
    //var string = "";
    //for (i = 0; i < 10; i++){
    //    latLng = randomLatlng.pop();
    //    string = string + "Lat: "+latLng.lat+", Lng: "+latLng.lng+"\n";
    //}
    //alert(string);
}

function snapToRoad(latLngArray){
    //alert("BeforeSnap:: Marker: "+markers.length+ "\n LatLnt: "+randomLatlngArray.length);
    for (var i = 0; i < latLngArray.length; i++){
        $.get('https://roads.googleapis.com/v1/snapToRoads', {
            interpolate: false,
            key: 'AIzaSyAAKHibq7dwe5Hbp0qmxrDRzzPVeQuwq8Y',
            path: latLngArray.pop()
        }, function(data) {
            latLngArray.push({lat:data.snappedPoints[0].location.latitude,
                                lng:data.snappedPoints[0].location.longitude});
        });
    }
    //alert("AfterSnap:: Marker: "+markers.length+ "\n LatLnt: "+randomLatlngArray.length);
}

function drawMarkers(latLngArray){
    //TODO: change icon-base
    var iconBase = 'http://localhost:63342/UberForTrucks/images/';
    removeMarkers();
    for (var i = 0; i < latLngArray.length; i++){
        var position = {lat: latLngArray[i].lat, lng: latLngArray[i].lng};
        markers[i] = new google.maps.Marker({
            position : position,
            map: map,
            animation: google.maps.Animation.DROP,
            icon: iconBase + 'car_marker.png'
        });
    }
    //alert("Finally:: Marker: "+markers.length+ "\n LatLnt: "+randomLatlngArray.length);
}

function removeMarkers(){
    for (var i = 0; i < markers.length; i++){
        markers[i].setMap(null);
    }
}
// Method to focus map on the place found
function expandViewportToFitPlace(map, place) {
    if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
    } else {
        map.setCenter(place.geometry.location);
        map.setZoom(13);
    }
}