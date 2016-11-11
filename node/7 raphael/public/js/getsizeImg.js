//----------------------------function get realsize image----------------------------//
// function get Image Size
function getImgRealSize(imgSrc) {

    var newImg = new Image();
    newImg.src = imgSrc; // this must be done AFTER setting onload
    console.log(newImg);
   	return {height:newImg.height,width:newImg.width};
}

function compare_realsize_with_500(height,width){
	var setheight = 500;
	var setwidth = (setheight/height)*width;
	return {height:setheight,width:setwidth};
}

function getImgSize(imgSrc){
	//var scaleImg = getImgRealSize(imgSrc);
	var scaleImg = getImgRealSize("/img/floor5.jpg");
	scaleImg = compare_realsize_with_500(scaleImg.height,scaleImg.width);
	console.log(scaleImg);
   	return {height:scaleImg.height,width:parseInt(scaleImg.width)};
}

//----------------------------------------------------------------------------------//