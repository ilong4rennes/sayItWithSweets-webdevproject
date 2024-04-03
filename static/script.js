let map;

async function initMap() {
 const position1 = { lat: 40.50583747622529, lng: -78.38690023678137 };
 
 // Request needed libraries.
 //@ts-ignore
 const { Map } = await google.maps.importLibrary("maps");
 const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

 // The map, centered at Aquarium
 map = new Map(document.getElementById("map"), {
   zoom: 13,
   center: position1,
   mapId: "DEMO_MAP_ID",
 });

 // The marker, positioned at Aquarium
 const marker1 = new AdvancedMarkerElement({
   map: map,
   position: position1,
   title: "Say it with sweets",
 });

}

initMap();

 
// Open the Modal
function openModal() {
  document.getElementById("myModal").style.display = "block";
}

// Close the Modal
function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  var captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  captionText.innerHTML = dots[slideIndex-1].alt;
}

function validate()  {
    var zipcode = $("#zipcode").val();
    if(zipcode.length != 5 || isNaN(zipcode)){
        alert("Zipcode is not in a valid format.");
        return false;
    }
}