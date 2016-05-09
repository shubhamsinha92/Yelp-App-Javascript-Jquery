function loadMap() {
    $.getScript("https://maps.googleapis.com/maps/api/js?sensor=true&key=AIzaSyA76T9s18a8Deja1p5RSlM-phK7eLJavOM", function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success);
        } else {
            error('Geo Location is not supported');
        }
        function success(position) {
            map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: position.coords.latitude, lng: poisition.coords.longitude},
                zoom: 8
            });
        };
    });
}