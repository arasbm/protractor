// Draw background and handle of protractor on #canvas
function drawProtractor(beta) {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var protractor = new Image();
  var handle = new Image();
  var pi = 3.14159;
  var border = 4;

  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  ctx.save();
  ctx.clearRect( 0, 0, canvas.width, canvas.height );

  ctx.fillStyle="#090";
  ctx.strokeStyle="#fff";

  protractor.src = 'img/protractor.png';
  protractor.onload = function(){
    w = canvas.width - border;
    h = protractor.height * (canvas.width / protractor.width) - border; 
    x = 0;
    y = 0;
    ctx.drawImage(protractor, x, y, w, h);
  };

  handle.src = 'img/handle.png';
  handle.onload = function(){
    x = (canvas.width / 2);
    y = 0;
    //h = canvas.height;
    //w = handle.width * (canvas.width / handle.height); 

    ctx.translate(x, y);
    ctx.rotate(pi * (beta / 180));
    ctx.drawImage(handle, -(handle.width / 2), 0); 
    ctx.restore();
  }

  //ctx.stroke();
  ctx.fillStyle = "red";
  ctx.font = "bold 24px Arial";
  ctx.fillText(beta + "°", canvas.width / 2, canvas.height - 40);
 
}

window.addEventListener("compassneedscalibration", function(event) {
  alert('Your compass needs calibrating! Wave your device in a figure-eight motion');
  event.preventDefault();
  }, true);

window.ondeviceorientation = function (event) {
  var orientedTo = (event.beta > 45 && event.beta < 135) ? "top" : (event.beta < -45 && event.beta > -135) ? "bottom" : (event.gamma > 45) ? "right" : (event.gamma < -45) ? "left" : "flat";
  var orientation = "<strong>Absolute: </strong>" + event.absolute + "<br>"
                  + "<strong>Alpha: </strong>" + event.alpha + "<br>"
                  + "<strong>Beta: </strong>" + event.beta + "<br>"
                  + "<strong>Gamma: </strong>" + event.gamma + "<br>"
                  + "<strong>Device orientation: </strong>" + orientedTo;
  drawProtractor(event.beta);
};

drawProtractor(90);

