// autocomplete
// reference: https://embed.plnkr.co/plunk/IWj3w4
var map;
var componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name'
};
function initMap() {
    var myLatLng = {lat: 44.977276, lng: -93.232266};
    map = new google.maps.Map(document.getElementById('map2'), {
        center: myLatLng,
        zoom: 14
    });

    var autocomplete = new google.maps.places.Autocomplete(
        (document.getElementById("location")), {
            types: ['geocode']
        });
        google.maps.event.addListener(autocomplete, 'place_changed', function() {
            fillInAddress();
    });

    new ClickEventHandler(map, origin);
}

function fillInAddress() {
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();

    for (var component in componentForm) {
        document.getElementById(component).value = '';
        document.getElementById(component).disabled = false;
    }

    // Get each component of the address from the place details
    // and fill the corresponding field on the form.
    for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0];
        if (componentForm[addressType]) {
        var val = place.address_components[i][componentForm[addressType]];
        document.getElementById(addressType).value = val;
        }
    }
}


// get the location clicked in the map using POI 

  function isIconMouseEvent(e) {
    return "placeId" in e;
  }
  
  class ClickEventHandler {
    map;
    placesService;
    constructor(map) {
      this.map = map;
      this.placesService = new google.maps.places.PlacesService(map);
      this.map.addListener("click", this.handleClick.bind(this));
    }
    handleClick(event) {
      console.log("You clicked on: " + event.latLng);
      if (isIconMouseEvent(event)) {
        console.log("You clicked on place:" + event.placeId);

        event.stop();
        if (event.placeId) {
          this.getPlaceInformation(event.placeId);
        }
      }
    }
   
    getPlaceInformation(placeId) {
      const me = this;
  
      this.placesService.getDetails({ placeId: placeId }, (place, status) => {
        if (
          status === "OK" &&
          place &&
          place.geometry &&
          place.geometry.location
        ) {
            console.log(place.formatted_address);
            document.getElementById("location").value = place.formatted_address;
        }
      });
    }
  }