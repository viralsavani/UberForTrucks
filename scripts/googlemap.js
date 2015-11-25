/**
 * Created by viral on 11/24/2015.
 */
var source_place_id = null;
var destination_place_id = null;

var destination_input = document.getElementById('destination_address');


function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        mapTypeControl: false,
        center: {lat: 0, lng: 0},
        streetViewControl: false,
        zoom: 13
    });
    var infoWindow = new google.maps.InfoWindow({map: map});

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('You are here');
            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }


    // AutoComplete for source_address
    var input_sourceAddress = /** @type {!HTMLInputElement} */(document.getElementById('source_address'));
    var autocomplete_sourceAddress = new google.maps.places.Autocomplete(input_sourceAddress);
    autocomplete_sourceAddress.bindTo('bounds', map);

    autocomplete_sourceAddress.addListener('place_changed', function() {
        var place = autocomplete_sourceAddress.getPlace();
        if (!place.geometry) {
            window.alert("Autocomplete's returned place contains no geometry");
            return;
        }
        // If the place has a geometry, then present it on a map.
        //expandViewportToFitPlace(map, place);
        source_place_id = place.place_id;
    });



    var input_destinationAddress = /** @type {!HTMLInputElement} */(document.getElementById('destination_address'));
    var autocomplete_destinationAddress = new google.maps.places.Autocomplete(input_destinationAddress);
    autocomplete_destinationAddress.bindTo('bounds', map);

    autocomplete_destinationAddress.addListener('place_changed', function() {
        var place = autocomplete_destinationAddress.getPlace();
        if (!place.geometry) {
            window.alert("Autocomplete's returned place contains no geometry");
            return;
        }
        // If the place has a geometry, then present it on a map.
        //expandViewportToFitPlace(map, place);
        destination_place_id = place.place_id;
    });


}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}

function expandViewportToFitPlace(map, place) {
    if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
    } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
    }
}


