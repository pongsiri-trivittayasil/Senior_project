//----------------------------function get realsize image----------------------------//

function compare_realsize_with_500(height,width){
	var setheight = 500;
	var setwidth = (setheight/height)*width;
	return {height:setheight,width:setwidth};
}

function getImgSize(size){
	//var scaleImg = getImgRealSize(imgSrc);
	var scaleImg = size;
	scaleImg = compare_realsize_with_500(scaleImg.height,scaleImg.width);
	console.log(scaleImg);
   	return {height:scaleImg.height,width:parseInt(scaleImg.width)};
}

//----------------------------------------------------------------------------------//