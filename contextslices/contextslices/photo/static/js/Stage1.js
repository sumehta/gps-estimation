/**
 *  Stage 1 js File
 *
 */
//Dynamic drawing the Rectangle
var canvas, context, startX, endX, startY, endY;
var mouseIsDown = 0;
var isAddCircleMarkClick =false;
var isAddRectMarkClick=false;
var isAddPolygonMarkClick=false;

var isRectPointsAdded=false;
var isCirclePointAdded=false;
var isPolyPointAdded=false;
var isClickedinCanvas;
var AddRectMark;
var AddPolygonMark;
var AddCircleMark;
var PolygonPoints=[];
var RectPoints;
var CirclePoint;

var MarkerPointsList=[];
var markListTage=[];
var markListWindow;
var listTagCounter = 0;

var ClueElementList=[];
var ClueListTage=[];
var clueListWindow;
var ClueListTageCounter=0;
var ClueTitle;
var ClueTextBoxContent;

//function for init the draw rectangle
function init() {
	
	var c = document.getElementById("canvas1");
	var ctx = c.getContext("2d");
	var img = document.getElementById("scream");
	ctx.drawImage(img, 0, 0, c.width, c.height);
	canvas = document.getElementById("canvasBase");
	context = canvas.getContext("2d");
	canvas.addEventListener("mousedown", mouseDown, false);
	canvas.addEventListener("mousemove", mouseXY, false);
	canvas.addEventListener("mouseup", mouseUp, false);
	
	AddRectMark = document.getElementById("AddRectMark");
	AddPolygonMark = document.getElementById("AddPolygonMark");
	AddCircleMark = document.getElementById("AddCircleMark");
	ClueTitle=document.getElementById("ClueTitle");
	ClueTextBoxContent = document.getElementById("ClueContext");
	
	//The marker list window Element;
	markListWindow = document.getElementById("markListItems");
	
	clueListWindow = document.getElementById("ClueList");
	console.log(clueListWindow);

	document.getElementById("Submit").disabled=true;
}

//add Marks number to the window
var selectedMarkNumber;
function addNewMarktoList(){
	
	markListTage[listTagCounter] = document.createElement("P");
	markListTage[listTagCounter].innerHTML="Mark"+String(listTagCounter+1) ;
	markListTage[listTagCounter].myIndex = listTagCounter;
	markListTage[listTagCounter].addEventListener("click", function(e) {
		context.clearRect(0, 0, canvas.width, canvas.height);
		chooseMarkIndex=this.myIndex;
		e = e || window.event;
		var target = e.target || e.srcElemen;
		var text = target.textContent || text.innerText;
		context.clearRect(0, 0, canvas.width, canvas.height);
		
		var temp = this.style.backgroundColor;

		if( temp=="yellow"){
			var Pelements = markListWindow.getElementsByTagName("P");
			console.log(Pelements);
			for(var i=0;i<Pelements.length;i++){
				Pelements[i].style.backgroundColor="white";
			}
			
			selectedMarkNumber="";
			
		}
		else{
			var Pelements = markListWindow.getElementsByTagName("P");
			console.log(Pelements);
			for(var i=0;i<Pelements.length;i++){
				Pelements[i].style.backgroundColor="white";
			}
			selectedMarkNumber = parseInt(this.innerHTML.substring(4));
			console.log(selectedMarkNumber);
			drawMarks(this.myIndex);
			this.style.backgroundColor = "yellow";
		}
	},false);
	
	markListWindow.appendChild(markListTage[listTagCounter]);
	
	listTagCounter++;
	
}





//action when Mouse Release
function mouseUp(eve) {
	if (mouseIsDown !== 0) {
		mouseIsDown = 0;
		var pos = getMousePos(canvas, eve);
		endX = pos.x;
		endY = pos.y;
		releaseUpX=endX;
		releaseUpY=endY;
		//store the mouse click coordinate
		//var coords = "x:" + MarkerPointsList[0][1].y;
		//document.getElementById("ClickPoint").innerHTML = coords;
		//console.log( MarkerPointsList);

	}
}
//action when Mouse is Pressed
//DOWN
//DOWN
//DOWN
function mouseDown(eve) {
	mouseIsDown = 1;
	var pos = getMousePos(canvas, eve);
	startX = endX = pos.x;
	startY = endY = pos.y;
	//store the mouse click coordinate
	//var coords = "Click Point X Coords: " + PolygonPoints.length + "   Y Coords:" + pos.y;
	console.log(markListTage);
	isClickinCanvas(pos);
	if(isAddPolygonMarkClick){
		if(Connected){
			resetPoly();
		}
		if(PolygonPoints.length>2){
			checkConnect();
		}
		if(!Connected){
			addPoint();
		}
	}
	if(isAddCircleMarkClick&&isClickedinCanvas){
		isCirclePointAdded=false;
	}
	if(isAddRectMarkClick&&isClickedinCanvas){
		isRectPointsAdded=false;
	}
}
//MOVE
//MOVE
//MOVE
function mouseXY(eve) {
		
		var pos = getMousePos(canvas, eve);
		endX = pos.x;
		endY = pos.y;
	if (mouseIsDown !== 0) {
		drawSquare();
		drawCircle();
	}
	else
	{
		if(isAddPolygonMarkClick){
			if(startPoly&&!Connected){
				drawPoly();
			}
			if(Connected){
				drawFinalPoly();
			}
		}
		
	
	}
}
/*
function checkAllCluesChecked(){
	if(document.getElementById("checkAllClues").checked ==true){
			context.clearRect(0, 0, canvas.width, canvas.height);
			drawAllMarks();
		}
	else{
		context.clearRect(0, 0, canvas.width, canvas.height);
	}
}*/



function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x : evt.clientX - rect.left,
		y : evt.clientY - rect.top
	};
}



function AddRectMarkClickF(){
	context.clearRect(0, 0, canvas.width, canvas.height);
	if(isAddRectMarkClick)
	{
		isAddRectMarkClick=false;
		isAddCircleMarkClick=false;
		isAddPolygonMarkClick=false;
		AddRectMark.style.border="";
		
		
	}
	else{
		isAddRectMarkClick=true;
		isAddCircleMarkClick=false;
		isAddPolygonMarkClick=false;
		AddRectMark.style.border="1px solid red";
		AddCircleMark.style.border="";
		AddPolygonMark.style.border="";
		resetPoly();
		
	}
}
function AddPolygonMarkClickF(){
	context.clearRect(0, 0, canvas.width, canvas.height);
	if(isAddPolygonMarkClick)
	{
		isAddPolygonMarkClick=false;
		isAddCircleMarkClick=false;
		isAddRectMarkClick=false;
		AddPolygonMark.style.border="";
		resetPoly();
	}
	else{
		isAddPolygonMarkClick=true;
		isAddCircleMarkClick=false;
		isAddRectMarkClick=false;
		AddPolygonMark.style.border="1px solid red";
		AddCircleMark.style.border="";
		AddRectMark.style.border="";
	}
}
function AddCircleMarkClickF(){
	context.clearRect(0, 0, canvas.width, canvas.height);
	if(isAddCircleMarkClick)
	{
		isAddCircleMarkClick=false;
		isAddRectMarkClick=false;
		isAddPolygonMarkClick=false;
		AddCircleMark.style.border="";
	}
	else{
		isAddCircleMarkClick=true;
		AddCircleMark.style.border="1px solid red";
		AddRectMark.style.border="";
		AddPolygonMark.style.border="";
		isAddRectMarkClick=false;
		isAddPolygonMarkClick=false;
		resetPoly();
	}
}


function clearClicks()
{
		isAddCircleMarkClick=false;
		isAddRectMarkClick=false;
		isAddPolygonMarkClick=false;
		AddCircleMark.style.border="";
		AddPolygonMark.style.border="";
		AddRectMark.style.border="";
}

function isClickinCanvas(point){
	if(point!=null)
	{
		isClickedinCanvas=true;
	}
	else{
		isClickedinCanvas=false;
	}
}

//connects the markers to the clues
function addMarkF()
{
	if(isAddPolygonMarkClick&&PolygonPoints.length>2){
		MarkerPointsList.push(PolygonPoints);
		resetPoly();
		alert("Polygan Marks Added!");
		addNewMarktoList();
	}
	else if(isAddCircleMarkClick && !isCirclePointAdded ){
		MarkerPointsList.push(CirclePoint);
		CirclePoint = null;
		isCirclePointAdded=true;
		alert("Cirlce Marks Added!");
		addNewMarktoList();
	}
	else if(isAddRectMarkClick&& !isRectPointsAdded ){
		MarkerPointsList.push(RectPoints);
		RectPoints = null;
		isRectPointsAdded=true;
		alert("Rectangle Marks Added!");
		addNewMarktoList();
	}
	else{
		alert("No Marks Created!")
	}
	
	document.getElementById('subMarkerListData').value = MarkerPointsListToString(MarkerPointsList);
	
	console.log(MarkerPointsList);
}

function drawAllRect( i){
		context.beginPath();
		context.rect(MarkerPointsList[i].topLeftX,MarkerPointsList[i].topLeftY,MarkerPointsList[i].width,MarkerPointsList[i].height);
		context.globalAlpha = 0.5;
		context.lineWidth = 3;
		context.strokeStyle = 'yellow';
		context.stroke();

}

function drawAllCircle( i){
		context.beginPath();
		context.arc(MarkerPointsList[i].centerX, MarkerPointsList[i].centerY, MarkerPointsList[i].radius, 0,2*Math.PI);
		context.globalAlpha = 0.5;
		context.lineWidth = 3;
		context.strokeStyle = 'yellow';
		context.stroke();	
}

function drawAllPoly(k){
	context.beginPath();
	var len = MarkerPointsList[k].length;
	for(var i=0;i<len-1;i++){
		context.moveTo( MarkerPointsList[k][i].x, MarkerPointsList[k][i].y);
		context.lineTo(MarkerPointsList[k][i+1].x, MarkerPointsList[k][i+1].y);
	}
	context.moveTo( MarkerPointsList[k][0].x, MarkerPointsList[k][0].y);
	context.lineTo(MarkerPointsList[k][len-1].x, MarkerPointsList[k][len-1].y);
	context.lineWidth = 3;
	context.strokeStyle = 'yellow';
	context.stroke();
}

function drawAllMarks(){
	for(var i=0;i<MarkerPointsList.length;i++){
		
		if(MarkerPointsList[i].type==0){
			drawAllRect(i);
		}
		else if(MarkerPointsList[i].type==1){ 
			drawAllCircle(i);
		}
		else{
			drawAllPoly(i);
		}
	}
}
function drawMarks(i){
	
	if(MarkerPointsList[i].type==0){
		drawAllRect(i);
	}
	else if(MarkerPointsList[i].type==1){ 
		drawAllCircle(i);
	}
	else{
		drawAllPoly(i);
	}
	
}

function submitTask(){
	var subClueTitle='';
	var subClueContent='';
	var subMarkerListData='';
	var imageId;
	var worerId;
	for(var i = 0; i< ClueElementList.length ; i++){
		if(ClueElementList[i]!=null){
			subClueTitle += ClueElementList[i].title + '&';
			subClueContent += ClueElementList[i].content + '&';
			subMarkerListData += MarkerPointsListToString(ClueElementList[i].marksList) + '&';
		}
	}
	document.getElementById("subClueTitle").value = subClueTitle;
	document.getElementById("subClueContent").value = subClueContent;
	document.getElementById("subMarkerListData").value = subMarkerListData;
	console.log(document.getElementById("subClueTitle").value );
	document.getElementById("testSubmit2").click();
}


window.addEventListener('load', init);
window.addEventListener('change', init);


