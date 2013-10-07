var screen_lock = window.navigator.requestWakeLock('screen');

document.addEventListener('DOMContentLoaded', function() {
  var handle = $('#handle');
  var w = document.body.clientWidth;
  var h = w / 2; // based on aspect ratio of backdrop image
  var handleWidth = h / 3.7; // based on aspect ratio of handle
  handle.animate({
      height: h,
      left: w / 2 - handleWidth / 2
    }, 300);
});

window.addEventListener('unload', function() {
  console.log('Protractor: unlocking the screen wake lock');
  screen_lock.unlock();
});

function rotate(object, degrees) {
  object.css({
  '-webkit-transform' : 'rotate(' + degrees + 'deg)',
     '-moz-transform' : 'rotate(' + degrees + 'deg)',
      '-ms-transform' : 'rotate(' + degrees + 'deg)',
       '-o-transform' : 'rotate(' + degrees + 'deg)',
          'transform' : 'rotate(' + degrees + 'deg)'
  });
}

// Display the given angle on the screen
function writeAngle(beta) {
  var trunc = Math.floor(100 * beta) / 100;
  $('div#show-angle').text(trunc + '°');
}

// adjust protractor handle according to beta angle
function adjustHandle(beta) {
  var handle = $('#handle');
  rotate(handle, beta);
}

function getEdgeAngle(evt) {
  var angle = evt.beta;

  if (angle > 90) {
    angle = 180 - angle;
  } else if (angle < -90) {
    angle = -180 - angle;
  }

  return angle;
}

window.addEventListener('compassneedscalibration', function(event) {
  alert('Your compass needs calibrating! Please wave your device in a figure-eight motion');
  event.preventDefault();
  }, true);

window.ondeviceorientation = function (event) {
  var angle = getEdgeAngle(event);
  adjustHandle(angle);
  writeAngle(angle);
};

