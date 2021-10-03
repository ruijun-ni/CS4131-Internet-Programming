// update time
const dt = new Date();
document.getElementById("date").innerHTML = dt;
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
document.getElementById("dateTime").innerHTML = days[dt.getDay()];


// ???????
// 4.1
// bug bug bug
var eventDays = document.getElementsByClassName("getDay");
for (var i = 0; i < days.length; i++) {
  if (eventDays[i] == days[dt.getDay()]) { //？
    document.getElementsByClassName("getDay")[i].style.color = "red";
  }
}



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
