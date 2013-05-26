$(document).ready(function() {
  var handle = $("#handle");
  var bp = $("#backdrop-protractor");
  handle.css({height: bp.height()});
  handle.css({left: (bp.width() / 2) - (handle.width() / 2)});
});

function rotate(object, degrees) {
    object.css({
  '-webkit-transform' : 'rotate('+degrees+'deg)',
     '-moz-transform' : 'rotate('+degrees+'deg)',  
      '-ms-transform' : 'rotate('+degrees+'deg)',  
       '-o-transform' : 'rotate('+degrees+'deg)',  
          'transform' : 'rotate('+degrees+'deg)'  
    });
}

// Display the given angle on the screen
function writeAngle(beta) {
  var trunc = Math.floor(100 * beta) / 100; 
  $("div#show-angle").text(trunc + "°");
}

// adjust protractor handle according to beta angle
function adjustHandle(beta) {
  var handle = $("#handle");
  rotate(handle, beta);
}

window.addEventListener("compassneedscalibration", function(event) {
  alert('Your compass needs calibrating! Wave your device in a figure-eight motion');
  event.preventDefault();
  }, true);

window.ondeviceorientation = function (event) {
  //use orientedTo value to correct negative value when phone is held upside down
  var orientedTo = (event.beta > 45 && event.beta < 135) ? "top" : (event.beta < -45 && event.beta > -135) ? "bottom" : (event.gamma > 45) ? "right" : (event.gamma < -45) ? "left" : "flat";

  writeAngle(event.beta);
  adjustHandle(event.beta);
};

