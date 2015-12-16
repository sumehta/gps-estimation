//Polygon Code~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Record whether the Poly is drawing, if is the loadOldLines must work when the mouse is move.
var startPoly=false;
function addPoint(){
	var point ={type:2,x:startX, y:startY};
	PolygonPoints.push(point);
	startPoly=true;
}
//draw old lines first, then draw the new line.
function drawPoly(){
	var len =PolygonPoints.length;
	context.clearRect(0, 0, canvas.width, canvas.height);
	//draw old lines
	loadOldLines();
	context.beginPath();
	context.moveTo( PolygonPoints[len-1].x, PolygonPoints[len-1].y);
	context.lineTo(endX,endY);
	context.globalAlpha = 0.5;
	context.lineWidth = 4;
	context.strokeStyle = 'yellow';
	context.stroke();
}

//Draw Poly when it is finish
function drawFinalPoly()
{
	var len =PolygonPoints.length;
	context.clearRect(0, 0, canvas.width, canvas.height);
	//draw old lines
	loadOldLines();
	context.beginPath();
	context.moveTo( PolygonPoints[len-1].x, PolygonPoints[len-1].y);
	context.lineTo(PolygonPoints[0].x, PolygonPoints[0].y);
	context.globalAlpha = 0.5;
	context.lineWidth = 2;
	context.strokeStyle = 'yellow';
	context.stroke();
}
//draw old lines
function loadOldLines(){
	var len =PolygonPoints.length;
	context.beginPath();
	for(var i=0;i<len-1;i++){
		context.moveTo( PolygonPoints[i].x, PolygonPoints[i].y);
		context.lineTo(PolygonPoints[i+1].x, PolygonPoints[i+1].y);
	}
	context.lineWidth = 2;
	context.strokeStyle = 'yellow';
	context.stroke();
}
//Check Whether the polygan is finish
var Connected=false;
function checkConnect(){
	if(Math.abs(PolygonPoints[0].x-startX)<10&&Math.abs(PolygonPoints[0].y-startY)<10){
		Connected=true;
	}
}

//reset the Polygon drawing/
function resetPoly(){
	Connected=false;
	startPoly=false;
	PolygonPoints=[];
}

//drawing the square

function drawSquare() {
	if(isAddRectMarkClick){
	// creating a square
	var w = endX - startX;
	var h = endY - startY;
	var offsetX = (w < 0) ? w : 0;
	var offsetY = (h < 0) ? h : 0;
	var width = Math.abs(w);
	var height = Math.abs(h);
	//clear the canvas all the time
	context.clearRect(0, 0, canvas.width, canvas.height);
	//flush
	context.beginPath();
	context.rect(startX + offsetX, startY + offsetY, width, height);
	context.globalAlpha = 0.5;
	context.lineWidth = 3;
	context.strokeStyle = 'yellow';
	//RectPoints Order: TopLeftX,TopLeftY, Width, Height.
	RectPoints ={type:0,topLeftX:startX + offsetX, topLeftY:startY + offsetY, width: width, height: height};
	context.stroke();}

}
function drawCircle(){
	if(isAddCircleMarkClick){
	// creating a square
	var w = endX - startX;
	var h = endY - startY;
	var offsetX = (w < 0) ? w : 0;
	var offsetY = (h < 0) ? h : 0;
	var width = Math.abs(w);
	var height = Math.abs(h);
	//clear the canvas all the time
	context.clearRect(0, 0, canvas.width, canvas.height);
	//flush
	context.beginPath();
	context.arc(startX + offsetX, startY + offsetY, width, 0,2*Math.PI);
	context.globalAlpha = 0.5;
	context.lineWidth = 3;
	context.strokeStyle = 'yellow';
	CirclePoint={type:1, centerX:startX + offsetX, centerY: startY + offsetY, radius:width};
	context.stroke();
	}
	
}