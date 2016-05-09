function initMap() {
    var markers=[];
    geoCoder = new google.maps.Geocoder();

    $("#city").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "http://gd.geobytes.com/AutoCompleteCity",
                dataType: "jsonp",
                data: {
                    q: request.term
                },
                success: function (data) {
                    response(data);
                }
            });
        },
        minLength: 3,
        select: function (event, ui) {
            $("#city").val(ui.item.label);
        }
    });

    $("#searchForm").submit(function (event) {
        event.preventDefault();
        if ($("#city").val() || $("#searchTerm").val()) {
            var searchTerm = $("#searchTerm").val();
            var searchCity = $("#city").val();
            findFromYelp(searchTerm, searchCity).success(function (data) {
                geoCodeAddress(searchCity);
                dropMarkers(data.businesses);
                //$("#searchTerm").val("");
                //$("#city").val("");
            });
        }
    });


    function SetCoordinates(position) {
        //console.log(position);
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: position.coords.latitude, lng: position.coords.longitude},
            zoom: 13
        });
        var latlng = {lat:position.coords.latitude,lng:position.coords.longitude};
        geoCoder.geocode({'location': latlng}, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    findFromYelp("",results[1].formatted_address).success(function(data){
                        dropMarkers(data.businesses);
                    })
                }
            }
        });
    }

    function geoCodeAddress(address){
        geoCoder.geocode({'address': address}, function(results, status){
            map.setCenter(results[0].geometry.location);
        })
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(SetCoordinates);
    }
    else {
        alert("Your browser doesn't support Geolocation");
    }

    function dropMarkers(markers) {
        for (var i = 0; i < markers.length; i++) {
                addMarkerMethod(markers[i]),i*200;
        }
    }

    function addMarkerMethod(marker,timeout){
        window.setTimeout(function() {
            markers.push(new google.maps.Marker({
                map:map,
                icon:chooseCorrectPinColor(marker),
                position:{lat:marker.location.coordinate.latitude,lng:marker.location.coordinate.longitude},
                animation: google.maps.Animation.DROP
            }));
        },timeout);
    }

    function clearMarkers() {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }
        markers = [];
    }

    function chooseCorrectPinColor(marker){
        if (marker.rating>=4){
            return 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
        }
        else if (3<marker.rating<4){
            return 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
        }
        else return 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
    }
}


