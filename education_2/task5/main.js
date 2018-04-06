var draggableObject=null;
var objectX, objectY, mouseX, mouseY;
function HandleMouseDown (e) {
	
			draggableObject=e.target;
		 	mouseX=e.clientX;
			mouseY=e.clientY;
			var rect =draggableObject.getBoundingClientRect();
			objectX=rect.x;
  			objectY=rect.y;

}

function HandleMouseMove(e) {
if (draggableObject) {
  draggableObject.style.left = objectX - (mouseX-e.clientX) + 'px';
  draggableObject.style.right = objectY - (mouseY-e.clientY) + 'px';
  // draggableObject.style.top = objectX - (mouseX-e.clientX) + 'px';
  // draggableObject.style.bottom = objectY - (mouseY-e.clientY) + 'px';
}
}

function HandleMouseUp(e) {
  draggableObject=null;
}