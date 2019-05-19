function updateClock (){

    // Setting up the clock
    var time = new Date();

    //Getting time information
    var sec = time.getSeconds();
    var min = time.getMinutes();

    // ********** TODO:::: Update for having militay and normal time!

    //Return Year as 2019 if its getYear() it would be 100 + the final 3 digets of the year so account for that in the code
    var year = time.getFullYear();
    var hour = time.getHours();
    var day = time.getDate();
    var month = time.getMonth();
    var _12Hours = ( hour > 12 ? "0" : "" ) + hour;

    //Formatting the time and dates
    sec = ( sec < 10 ? "0" : "" ) + sec;
    min = ( min < 10 ? "0" : "" ) + min;
    month = ( month < 10 ? "0" : "" ) + month;
    day = ( day < 10 ? "0" : "" ) + day;

    if(hour == 0){
        _12Hours = 12;
    }
    else if (_12Hours > 12){
        _12Hours = _12Hours - 12
    }
    else{
        _12Hours ;
    }

    //Getting the PM or AM
    PorA = (hour < 12 ? "AM" : "PM");

    var timeString = _12Hours + ":" + min + ":" + sec + " " + PorA;


    // Update the time display
    document.getElementById("clock").firstChild.nodeValue = timeString;
  
}
function clockDraw(){
    var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.90
setInterval(drawClock, 1000);

function drawClock() {
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
  var grad;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2*Math.PI);
  ctx.fillStyle = 'white';
  ctx.fill();
  grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
  grad.addColorStop(0, '#333');
  grad.addColorStop(0.5, 'white');
  grad.addColorStop(1, '#333');
  ctx.strokeStyle = grad;
  ctx.lineWidth = radius*0.1;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
  ctx.fillStyle = '#333';
  ctx.fill();
}

function drawNumbers(ctx, radius) {
  var ang;
  var num;
  ctx.font = radius*0.15 + "px arial";
  ctx.textBaseline="middle";
  ctx.textAlign="center";
  for(num = 1; num < 13; num++){
    ang = num * Math.PI / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius*0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius*0.85);
    ctx.rotate(-ang);
  }
}

function drawTime(ctx, radius){
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    //hour
    hour=hour%12;
    hour=(hour*Math.PI/6)+
    (minute*Math.PI/(6*60))+
    (second*Math.PI/(360*60));
    drawHand(ctx, hour, radius*0.5, radius*0.07);
    //minute
    minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawHand(ctx, minute, radius*0.8, radius*0.07);
    // second
    second=(second*Math.PI/30);
    drawHand(ctx, second, radius*0.9, radius*0.02);
}

function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}
}
