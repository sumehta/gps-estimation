var choosenClueIndex=0;
var chooseMarkIndex=0;
var selectedClueNumber;

function addNewCluetoList(){
	document.getElementById("Submit").disabled=false;
	//Check Whether the Title or Content are empty.
	
	if(selectedClueNumber!=null){
		alert("You cannot modify the Clue!");
		return;
	}
	if(ClueTitle.value==""||ClueTextBoxContent==""){
		alert("Title or Content can not be empty!");
		return;
	}

	ClueListTage[ClueListTageCounter] = document.createElement("P");
	ClueListTage[ClueListTageCounter].innerHTML=ClueTitle.value ;
	ClueListTage[ClueListTageCounter].myIndex = ClueListTageCounter;
	ClueListTage[ClueListTageCounter].addEventListener("click", function(e) {
		
	//Disable button click and typing
	document.getElementById("AddMark").disabled=true;
	document.getElementById("SaveClues").disabled=true;
	ClueTitle.disabled = true;
	ClueTextBoxContent.disabled = true;
	
	context.clearRect(0, 0, canvas.width, canvas.height);
	e = e || window.event;
	var target = e.target || e.srcElemen;
	var text = target.textContent || text.innerText;
	loadClue(this.myIndex);
	var temp = this.style.backgroundColor;
	

	if( temp=="yellow"){
		var Pelements = clueListWindow.getElementsByTagName("P");
		for(var i=0;i<Pelements.length;i++){
			Pelements[i].style.backgroundColor="white";
		}
		
		selectedClueNumber=null;
		
	}
	else{
		var Pelements = clueListWindow.getElementsByTagName("P");
		console.log(Pelements);
		for(var i=0;i<Pelements.length;i++){
			Pelements[i].style.backgroundColor="white";
		}
		selectedClueNumber = this.myIndex;
		this.style.backgroundColor = "yellow";
	}
	
	
	},false);
	
	
	//alert(ClueTitle.value);
	var ClueElement = {title:ClueTitle.value , content:ClueTextBoxContent.value, marksList:MarkerPointsList};
	
	ClueElementList.push(ClueElement);
	alert("Add a new Clue.    ClueTitle:"+ClueTitle.value+  "ClueContext:"+ClueTextBoxContent.value);
	clueListWindow.appendChild(ClueListTage[ClueListTageCounter]);
	ClueListTageCounter++;
	clearAll();

}


function MarkerPointsListToString(MarkerPointsList){
	var resultString='';
	for(var i =0; i < MarkerPointsList.length; i++){
		if(MarkerPointsList[i]!=null){
			//Rectange toString
		if(MarkerPointsList[i].type==0){
			resultString+= '0'+',';
			resultString+= MarkerPointsList[i].topLeftX+',';
			resultString+= MarkerPointsList[i].topLeftY+',';
			resultString+= MarkerPointsList[i].width+',';
			resultString+= MarkerPointsList[i].height;
		}
		//Circle
		else if(MarkerPointsList[i].type==1){
			resultString+= '1'+',';
			resultString+= MarkerPointsList[i].centerX+',';
			resultString+= MarkerPointsList[i].centerY+',';
			resultString+= MarkerPointsList[i].radius;
		}
		//Poly
		else{
			resultString+= '2'+',';
			for(var k =0; k <MarkerPointsList[i].length-1; k++){
				resultString+= MarkerPointsList[i][k].x+'|';
				resultString+= MarkerPointsList[i][k].y+',';
			}
			resultString+= MarkerPointsList[i][MarkerPointsList[i].length-1].x+'|';
			resultString+= MarkerPointsList[i][MarkerPointsList[i].length-1].y;
		}
		if(i<MarkerPointsList.length-1){
			resultString += ';';
		}
		}
		
	}
	return resultString;
	
}

function loadClue(index)
{
	if(ClueElementList[index]!=null){
		choosenClueIndex=index;
		MarkerPointsList=[];
		console.log(markListTage.length);
		for(var i=0;i<markListTage.length;i++)
		{
			markListTage[i].innerHTML='';
			markListTage[i]= null;
		}
		markListTage=[];
		listTagCounter=0;
		
		for(var i =0;i<ClueElementList[index].marksList.length;i++){
			if(ClueElementList[index].marksList[i]!=null){
				MarkerPointsList.push(ClueElementList[index].marksList[i]);
				addNewMarktoList();
			}
			
		}
		console.log(markListTage.length);
		ClueTitle.value=ClueElementList[index].title;
		ClueTextBoxContent.value=ClueElementList[index].content;
	}
	
}

function removeClue(){
	
	console.log(choosenClueIndex);
	ClueListTage[choosenClueIndex].innerHTML='' ;
	ClueListTage[choosenClueIndex] = '';
	ClueListTage[choosenClueIndex]=null;
	ClueElementList[choosenClueIndex]=null;
	clearAll();
}
function removeMark(){
	if(chooseMarkIndex==null){
		alert("Please select a mark.");
		return;
	}
	MarkerPointsList[chooseMarkIndex]=null;
	markListWindow.innerHTML="";
	for(var a = 0; a<markListTage.length-1;a++ ){
		markListWindow.appendChild(markListTage[a]);
	}

	ClueElementList[choosenClueIndex].marksList[chooseMarkIndex]=null;
	clearAll();	
}



function clearAll(){
	clearClicks();
	MarkerPointsList=[];
	ClueTitle.value='';
	ClueTextBoxContent.value='';

	for(var i=0;i<markListTage.length;i++)
	{
		markListTage[i].innerHTML='';
		markListTage[i]= null;
	}
	markListTage=[];
	context.clearRect(0, 0, canvas.width, canvas.height);
	listTagCounter=0;
	choosenClueIndex='';
	chooseMarkIndex='';
	markListWindow.innerHTML="";
}

function newClueButton(){
	document.getElementById("AddMark").disabled=false;
	document.getElementById("SaveClues").disabled=false;
	
	ClueTitle.disabled = false;
	ClueTextBoxContent.disabled = false;
	selectedClueNumber=null;
	var Pelements = clueListWindow.getElementsByTagName("P");
		for(var i=0;i<Pelements.length;i++){
			Pelements[i].style.backgroundColor="white";
		}
	clearAll();
}