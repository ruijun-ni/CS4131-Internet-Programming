/*************************************\
|**                                 **|
|**        JS for mySchedule        **|
|**                                 **|
\*************************************/

// timer - update time and day
let timer = setInterval(clock, 1000);
function clock() {
  var datetoday = new Date();
  var timenow = datetoday.toLocaleTimeString();
  document.getElementById("clock").innerHTML = timenow;
}
var datetoday = new Date();
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var getDay = days[datetoday.getDay()];
var theDay = document.getElementsByClassName(getDay.toString());
for (var i=0; i<theDay.length; i++) {
  theDay[i].style.color = "red";
}


// showing and fading picture
document.getElementById("show_or_goaway").addEventListener("click", display);

function display() {
  var target = document.getElementById("gopher");
  
  if (document.getElementById("show_or_goaway").innerHTML == "Go away!"){
    var fadeEffect = setInterval(function() {
      if (!target.style.opacity) {
        target.style.opacity = 1;
      }
      if (target.style.opacity > 0) {
        target.style.opacity -= 0.1;
      } else {
        clearInterval(fadeEffect);
      }
    }, 200);
    document.getElementById("show_or_goaway").innerHTML = "Come back!";
  } else {
    var g_opacity = 0;
    var showEffect = setInterval(function() {
      console.log("show");
      if (target.style.opacity < 1) {
        console.log("increase", g_opacity);
        target.style.opacity = g_opacity + 0.1;
        g_opacity += 0.1;
      } else {
        console.log("clear increase");
        clearInterval(showEffect);
      }
    }, 200);
    document.getElementById("show_or_goaway").innerHTML = "Go away!";
  }
};


// pictures on the right
document.getElementById("blegen").addEventListener("mouseover",function(){
  document.getElementById("gopher").src="img/blegen.jpg";
});
document.getElementById("willey").addEventListener("mouseover",function(){
  document.getElementById("gopher").src="img/willey.jpg";
});
document.getElementById("walter").addEventListener("mouseover",function(){
  document.getElementById("gopher").src="img/walter.jpg";
});
document.getElementById("keller1").addEventListener("mouseover",function(){
  document.getElementById("gopher").src="img/keller.jpg";
});
document.getElementById("coffman").addEventListener("mouseover",function(){
  document.getElementById("gopher").src="img/coffman.jpg";
});
document.getElementById("keller2").addEventListener("mouseover",function(){
  document.getElementById("gopher").src="img/keller.jpg";
});
document.getElementById("svf").addEventListener("mouseover",function(){
  document.getElementById("gopher").src="img/svf.jpg";
});
document.getElementById("tate").addEventListener("mouseover",function(){
  document.getElementById("gopher").src="img/tate.jpg";
});
document.getElementById("teahouse").addEventListener("mouseover",function(){
  document.getElementById("gopher").src="img/teahouse.jpg";
});
document.getElementById("rec").addEventListener("mouseover",function(){
  document.getElementById("gopher").src="img/rec.jpg";
});


// input area
// when "other" is selected, enable the textbox
var places = document.getElementById("places")
places.addEventListener('change', (e) => {  
  if (places.value == "Other") {
    console.log("'Other' is selected, enable the textbox");
    document.getElementById("textbox").disabled = false;
  } else {
    document.getElementById("textbox").disabled = true;
  }
});


// map: geocoder
var marker, marker2;
var infowindow, infowindow2;
var service;

function geocodeAddress(geocoder, resultsMap, name, address, time, day) {
  geocoder.geocode({'address': address}, function(results, status) {
    const icon_img = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
    if (status === google.maps.GeocoderStatus.OK) {
        resultsMap.setCenter(results[0].geometry.location);
        marker2 = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location,
              title:address,
              icon: icon_img
              });
        infowindow2 = new google.maps.InfoWindow({
              content: "<p>" + name + "</p><p>" + day + time + "</p><p>" + address + "</p>"
              });
  
        google.maps.event.addListener(marker2, 'click', createWindow(resultsMap, infowindow2, marker2));
    } else {
        alert('Geocode was not successful for the following reason: ' + status);
    } 
  }); 
} 


function createWindow(rmap, rinfowindow, rmarker){
  return function(){
      rinfowindow.open(rmap, rmarker);
  }
}

// init map

function initMap() {
  var myLatLng = {lat: 44.977276, lng: -93.232266};
  /* Create a map and place it on the div */
  var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: myLatLng
    });

  // dynamically extract the name, time and location of the physical events from the DOM objects
  var locations = document.getElementsByClassName("eventLocation"); // This is the locations we will search for using the geocoder
  var names = document.getElementsByClassName("eventName");
  var times = document.getElementsByClassName("eventTime");
  var days = document.getElementsByClassName("weekdays");
  
  for (var i = 0; i < locations.length; i++) {
    var geocoder = new google.maps.Geocoder(); // Create a geocoder object
    geocodeAddress(geocoder, map, names[i].innerText,locations[i].innerText, times[i].innerText, days[i].innerText);
  }


  // the second search component
  var currentPos = {
    lat: 44.977276, lng: -93.232266
  };
  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position);
    currentPos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    console.log(currentPos);
    
  });

  const directionsRenderer = new google.maps.DirectionsRenderer();
  const directionsService = new google.maps.DirectionsService();

  directionsRenderer.setMap(map);
  directionsRenderer.setPanel(document.getElementById("sidebar"));

  const control = document.getElementById("floating-panel");

  map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);

  const onChangeHandler = function () {
    calculateAndDisplayRoute(directionsService, directionsRenderer, currentPos);
  };

  document.getElementById("secondBtn").addEventListener("click", onChangeHandler);


  var autocomplete = new google.maps.places.Autocomplete(
    (document.getElementById("end")), {
        types: ['geocode']
    });
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
        fillInAddress();
  });


} 

// for the second input box
function calculateAndDisplayRoute(directionsService, directionsRenderer, currentPos) {

  const selectedMode = document.querySelector('input[name="travel"]:checked').value;

  console.log(selectedMode);
  const end = document.getElementById("end").value;

  directionsService
    .route({
      origin: currentPos,
      destination: end,
      travelMode: google.maps.TravelMode[selectedMode],
    })
    .then((response) => {
      directionsRenderer.setDirections(response);
    })
    .catch((e) => window.alert("Directions request failed due to " + status));
}

// for autocomplete
let autocomplete;
var componentForm = {
  street_number: 'short_name',
  route: 'long_name',
  locality: 'long_name',
  administrative_area_level_1: 'short_name',
  country: 'long_name',
  postal_code: 'short_name'
};
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

// for the first input box
function getLocation() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 44.977276, lng: -93.232266},
    zoom: 14
  });
  const theRadius =  document.getElementById("numberOfMeters").value;
  var placeType = document.getElementById("places").value;
  console.log(placeType);
  if (placeType == "Other") {
    console.log("other is selected");
    placeType = document.getElementById("textbox").value;
  }
  
  var request = {
    location: {lat: 44.977276, lng: -93.232266},
    radius: theRadius,
    type: placeType
  };
  console.log(request);
  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

// //////// TODO: InfoWindow
// TODO: content

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var position = results[i].geometry.location;

      marker = new google.maps.Marker({ position: position, map: map});
 
      infowindow = new google.maps.InfoWindow({
        content: position.toString()
      });
    

      google.maps.event.addListener(marker, "click",createWindow(map,infowindow,marker));
    }
  }
}
