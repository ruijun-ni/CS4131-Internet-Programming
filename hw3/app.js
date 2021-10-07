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


// map: geocoder
var marker, marker2;
var infowindow, infowindow2;
var service;

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

  // return the value of the address entered in an input text box when the submit button is clicked

  // // nearby search
  // var request = {
  //   location: navigator.geolocation.getCurrentPosition(success), // find the current location
  //   radius: '500',
  //   type: ['restaurant']
  // };
  // service = new google.maps.places.PlacesService(map);
  // service.nearbySearch(request, callback);

}  // end init map function definiton

// function success(pos) {
//   var crd = pos.coords;
//   console.log('Your current position is:');
//   console.log(`Latitude : ${crd.latitude}`);
//   console.log(`Longitude: ${crd.longitude}`);
// }

// function callback(results, status) {
//   console.log("all places nearby");
//   for (var i = 0; i < results.length; i++) {
//       console.log(results[i]);
//       var geocoder1 = new google.maps.Geocoder(); // Create a geocoder object

//       createMarker(geocoder1, map, results[i]);
//   }
// }

// function createMarker(geocoder, resultsMap, address) {

//   geocoder.geocode({'address': address}, function(results, status) {
//     const icon_img = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
//     if (status === google.maps.GeocoderStatus.OK) {
//         resultsMap.setCenter(results[0].geometry.location);
//         marker1 = new google.maps.Marker({
//               map: resultsMap,
//               position: results[0].geometry.location,
//               title:address,
//               icon: icon_img
//               });
//         infowindow1 = new google.maps.InfoWindow({
//               content: "<p>" + address + "</p>"
//               });
  
//         google.maps.event.addListener(marker1, 'click', createWindow(resultsMap, infowindow1, marker1));
//     } else {
//         alert('Geocode was not successful for the following reason: ' + status);
//     } 
//   }); 
// } 


// This function takes a geocode object, a map object, and an address, and 
// if successful in finding the address, it places a marker with a callback that shows an 
// info window when the marker is "clicked"
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
    } //end if-then-else
  }); // end call to geocoder.geocode function
} // end geocodeAddress function

// Function to return an anonymous function that will be called when the rmarker created in the 
  // geocodeAddress function is clicked	
function createWindow(rmap, rinfowindow, rmarker){
  return function(){
      rinfowindow.open(rmap, rmarker);
  }
}//end create (info) window


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
