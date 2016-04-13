function initializeAutocomplete(id) {
  var element = document.getElementById(id);
  if (element) {
    var autocomplete = new google.maps.places.Autocomplete(element, { types: ['geocode'] });
    google.maps.event.addListener(autocomplete, 'place_changed', onPlaceChanged);
  }
}

function onPlaceChanged() {
  var place = this.getPlace();
  //console.log(place);  // Uncomment this line to view the full object returned by Google API.
  //console.log(place.geometry.access_points[0].location.lat) //latitude
  //console.log(place.geometry.access_points[0].location.lng) //longitude
  for (var i in place.address_components) {
    var component = place.address_components[i];
    for (var j in component.types) {  // Some types are ["country", "political"]
      var type_element = document.getElementById(component.types[j]);
      if (type_element) {
        type_element.value = component.long_name;
      }
    }
  }
  //document.getElementById('lat').innerHTML = lat;
  //document.getElementById('lng').innerHTML = lng;
}

google.maps.event.addDomListener(window, 'load', function() {
  initializeAutocomplete('destination');
    setTimeout(function(){
          $('#destination').attr('placeholder', '')

    }, 3000)

});
