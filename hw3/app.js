
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
    var showEffect = setInterval(function() {
      if (target.style.opacity < 1) {
        target.style.opacity += 0.1;
      } else {
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
