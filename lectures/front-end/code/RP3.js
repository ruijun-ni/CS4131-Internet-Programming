// RP3.js
// Automatic Random image selection and display using arrays
var iconImg; 
var pictures = [ "CPE", "EPT", "GPP", "GUI", "PERF", "PORT", "SEO" ];
var descriptions = [ "Common Programming Error", 
   "Error-Prevention Tip", "Good Programming Practice", 
   "Look-and-Feel Observation", "Performance Tip", "Portability Tip", 
   "Software Engineering Observation" ];
var index = 0;

function pickImage() {
	iconImg.setAttribute("src", pictures[index] + ".png");
	iconImg.setAttribute( "alt", descriptions[ index ] );
	index = (index + 1) % pictures.length;
}

function start() {
	   //alert("got in start");
   iconImg = document.getElementById( "image" );
   //alert(iconImg);
   int = setInterval(function(){pickImage()},1000);
} // end function start