
// timer - update time
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


// fading picture
// using jQuery
/*
let $img = $("#gopher");
$("#show_or_goaway").click(function() {
  if (document.getElementById("show_or_goaway").innerHTML == "Go away") {
    $img.fadeOut(2000);
    document.getElementById("show_or_goaway").innerHTML = "Come back";
  } else {
    $img.show(2000);
    document.getElementById("show_or_goaway").innerHTML = "Go away";
  }
});
*/

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


// pictures
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



// // dynamically extract the name, time and location of the physical events from the DOM objects
// var eventNames = document.getElementsByClassName("eventName");
// var eventTimes = document.getElementsByClassName("eventTime");
// var eventLocations = document.getElementsByClassName("eventLocation");
// console.log("dynamially extract the names, times and locations");


// var geocoder;
// var map;
// function initialize() {
//   geocoder = new google.maps.Geocoder();
//   var latlng = new google.maps.LatLng(44.977276, -93.232266);
//   var mapOptions = {
//     zoom: 14,
//     center: latlng
//   }
//   map = new google.maps.Map(document.getElementById('map'), mapOptions);
// }

// function codeAddress() {
//     for (var i = 0; i < eventNames.length; i++) {
//       geocoder.geocode( { 'address': eventLocations[i]}, function(results, status) {
//       if (status == 'OK') {
//         map.setCenter(results[0].geometry.location);
//         var marker = new google.maps.Marker({
//             map: map,
//             position: results[0].geometry.location
//         });
//       } else {
//         alert('Geocode was not successful for the following reason: ' + status);
//       }
//     });
//   }

// }


// function initMap() {
//   const myLatLng = { lat: 44.977276, lng: -93.232266};
//   const map = new google.maps.Map(document.getElementById("map"), {
//     zoom: 14,
//     center: myLatLng,
//   });

//   new google.maps.Marker({
//     position: myLatLng,
//     map,
//     title: "Hello World!",
//   });
// }




// // This example adds a search box to a map, using the Google Place Autocomplete
// // feature. People can enter geographical searches. The search box will return a
// // pick list containing a mix of places and predicted search terms.
// // This example requires the Places library. Include the libraries=places
// // parameter when you first load the API. For example:
// // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
// function initAutocomplete() {
//   const map = new google.maps.Map(document.getElementById("map"), {
//     center: { lat: 44.977276, lng: -93.232266},
//     zoom: 14,
//     mapTypeId: "roadmap",
//   });
//   // Create the search box and link it to the UI element.
//   const input = document.getElementById("pac-input");
//   const searchBox = new google.maps.places.SearchBox(input);

//   map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
//   // Bias the SearchBox results towards current map's viewport.
//   map.addListener("bounds_changed", () => {
//     searchBox.setBounds(map.getBounds());
//   });

//   let markers = [];

//   // Listen for the event fired when the user selects a prediction and retrieve
//   // more details for that place.
//   searchBox.addListener("places_changed", () => {
//     const places = searchBox.getPlaces();
//     // TODO: also add the place in the schedule

//     if (places.length == 0) {
//       return;
//     }

//     // // Clear out the old markers.
//     // markers.forEach((marker) => {
//     //   marker.setMap(null);
//     // });
//     // markers = [];

//     // For each place, get the icon, name and location.
//     const bounds = new google.maps.LatLngBounds();

//     places.forEach((place) => {
//       if (!place.geometry || !place.geometry.location) {
//         console.log("Returned place contains no geometry");
//         return;
//       }

//       const icon = {
//         url: place.icon,
//         size: new google.maps.Size(71, 71),
//         origin: new google.maps.Point(0, 0),
//         anchor: new google.maps.Point(17, 34),
//         scaledSize: new google.maps.Size(25, 25),
//       };

//       // Create a marker for each place.
//       const icon_img = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";

//       markers.push(
//         new google.maps.Marker({
//           map,
//           icon: icon_img,
//           // TODO: 加上事件名和时间段
//           title: place.name,
//           position: place.geometry.location,

//         })
//       );
//     });
//     map.fitBounds(bounds);
//   });
// }
