$(window).load(function() {
    $(".loader").fadeOut("slow");
})


$(document).ready(function(){
  $('.toggle-menu').jPushMenu({closeOnClickLink: false});
  $('.dropdown-toggle').dropdown();
});

$(document).ready(function () {
    $("#clients-slider").carousel({
        interval: 1000 //TIME IN MILLI SECONDS
    });
});
  

$(function () {
$.scrollUp({
  scrollName: 'scrollUp', // Element ID
  topDistance: '300', // Distance from top before showing element (px)
  topSpeed: 600, // Speed back to top (ms)
  animation: 'fade', // Fade, slide, none
  animationInSpeed: 200, // Animation in speed (ms)
  animationOutSpeed: 200, // Animation out speed (ms)
  activeOverlay: false, // Set CSS color to display scrollUp active point, e.g '#00FFFF'
  scrollImg: true,
});
});