document.addEventListener("DOMContentLoaded",function(){
	var element = document.getElementById("do");
	var ufo = document.getElementById("ufo");
	var dropdown = document.getElementById("speed");
	element.addEventListener("click", function(ev){
		var value = dropdown.options[dropdown.selectedIndex].value;
		var className;
		if(value==="1"){
			className = "firstClass";
		}
		if(value==="2"){
			className = "secondClass";
		}
		if(value==="3"){
			className = "thirdClass";
		}
		if(value==="4"){
			className = "fourthClass";
		}
		if(value==="5"){
			className = "fifthClass";
		}
		ufo.className=className;
});
});
