var color = "#000000";
var currentShape = "pencil";
var shapeSize = 8;
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var canDraw = false;

var newFile = document.querySelector('.new-file');
var pencil = document.querySelector('.pencil');
var line = document.querySelector('.line');
var fill = document.querySelector('.fill');

context.lineWidth = shapeSize;

var newCanvas;
var newContext;

$(document).on('input', '.slider', function() {
    shapeSize = $(this).val();
    context.lineWidth = shapeSize;
});

function update(jscolor) {
    color = '#' + jscolor;
}
newFile.addEventListener('click', function(){
    context.clearRect(0, 0, canvas.width, canvas.height);
});
pencil.addEventListener('click', function(){
    currentShape = "pencil";
    this.style.border = "2px solid  rgba(231, 213, 95, 0.93)";
    line.style.border = "1px solid #cfcfcf";
    fill.style.border = "1px solid #cfcfcf";
});

line.addEventListener('click', function(){
    currentShape = "line";
    this.style.border = "2px solid  rgba(231, 213, 95, 0.93)";
    pencil.style.border = "1px solid #cfcfcf";
    fill.style.border = "1px solid #cfcfcf";
});

fill.addEventListener('click', function(){
    currentShape = "fill";
    this.style.border = "2px solid  rgba(231, 213, 95, 0.93)";
    pencil.style.border = "1px solid #cfcfcf";
    line.style.border = "1px solid #cfcfcf";
});

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }
canvas.addEventListener('mousemove', function(evt) {
    var mousePos = getMousePos(canvas, evt);
    if(canDraw && currentShape === "pencil"){
        context.lineTo(mousePos.x, mousePos.y);
        context.strokeStyle = color;
        context.stroke();
    }
    if(canDraw && currentShape === "fill"){
        context.lineTo(mousePos.x, mousePos.y);
        context.strokeStyle = "white";
        context.stroke();
    }
  }, false);

canvas.addEventListener('mousedown', function(evt){
      canDraw = true;
      var mousePos = getMousePos(canvas, evt);
      context.beginPath();
      if(currentShape === "line"){
        createNewCanvas(mousePos.x, mousePos.y);
      }
  });
  canvas.addEventListener('mouseup', function(evt){
    canDraw = false;
  });

function createNewCanvas(beginX, beginY){
    newCanvas = document.createElement("canvas");
    newCanvas.id = "newCanvas";
    newCanvas.width = 1000;
    newCanvas.height = 450;
    newContext = newCanvas.getContext('2d');
    document.getElementById("main-content").appendChild(newCanvas);
    newContext.beginPath();

    newCanvas.addEventListener('mousemove', function(evt) {
        var mousePos = getMousePos(canvas, evt);
        if(canDraw && currentShape === "line"){
            newContext.clearRect(0, 0, newCanvas.width, newCanvas.height);
            newContext.beginPath();
            newContext.lineWidth = shapeSize;
            newContext.moveTo(beginX, beginY);
            newContext.lineTo(mousePos.x, mousePos.y);
            newContext.strokeStyle = color;
            newContext.stroke();
        }
    });
    newCanvas.addEventListener('mouseup', function(evt) {
        canDraw = false;
        newCanvas.remove();
        var mousePos = getMousePos(canvas, evt);
        context.beginPath();
        context.moveTo(beginX, beginY);
        context.lineTo(mousePos.x, mousePos.y);
        context.strokeStyle = color;
        context.stroke();
    });

}