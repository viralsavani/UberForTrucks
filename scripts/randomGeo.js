function generateRandomPoints(center, radius, count) {
    var points = [];
    for (var i=0; i<count; i++) {
        points.push(generateRandomPoint(center, radius));
    }
    return points;
}

function generateRandomPoint(center, radius) {
    var x0 = center.lng;
    var y0 = center.lat;
    // Convert Radius from meters to degrees.
    var rd = radius/111300;

    var u = Math.random();
    var v = Math.random();

    var w = rd * Math.sqrt(u);
    var t = 2 * Math.PI * v;
    var x = w * Math.cos(t);
    var y = w * Math.sin(t);

    var xp = x/Math.cos(y0);

    // Resulting point.
    return {'lat': y+y0, 'lng': xp+x0};
}
