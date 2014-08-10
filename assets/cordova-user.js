var pictureSource;   // picture source
var destinationType; // sets the format of returned value

// device APIs are available
//
function onDeviceReady() {
	pictureSource=navigator.camera.PictureSourceType;
	destinationType=navigator.camera.DestinationType;
	document.addEventListener("backbutton", onBackKeyDown, false); //back button listerner
}

//GET ANDROID EMAIL
function getAndroidData(){
	
}

/******************/
/*BACK BUTTON*/
/******************/
//click backbutton function
function onBackKeyDown() {
	$.mobile.back();//jquery mobile back page
}

/******************/
/*CAMERA MANAJEMEN*/
/******************/
// Called when a photo is successfully retrieved
//
function onPhotoDataSuccess(imageData) {
//hide element
$('#laporansaya').show();
// Uncomment to view the base64-encoded image data
// console.log(imageData);
// Get image handle
var smallImage = document.getElementById('PreviewImage');
// Unhide image elements
smallImage.style.display = 'block';
// Show the captured photo
// The inline CSS rules are used to resize the image
smallImage.src = "data:image/jpeg;base64," + imageData;
}

// Called when a photo is successfully retrieved
//
function onPhotoURISuccess(imageURI) {
//hide element
$('#laporansaya').show();
// Uncomment to view the image file URI
// console.log(imageURI);
// Get image handle
//
var largeImage = document.getElementById('PreviewImage');
// Unhide image elements
//
largeImage.style.display = 'block';

// Show the captured photo
// The inline CSS rules are used to resize the image
//
largeImage.src = imageURI;
}

// A button will call this function
//
function capturePhoto() {
// Take picture using device camera and retrieve image as base64-encoded string
navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
	destinationType: destinationType.DATA_URL });
}
// A button will call this function
//
function capturePhotoEdit() {
// Take picture using device camera, allow edit, and retrieve image as base64-encoded string
navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
	destinationType: destinationType.DATA_URL });
}
// A button will call this function
//
function getPhoto(source) {
// Retrieve image file location from specified source
navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
	destinationType: destinationType.FILE_URI,
	sourceType: source });
}
// Called if something bad happens.
//
function onFail(message) {
	alert('Failed because: ' + message);
}
/*************************/
/*END OF CAMERA MANAJEMEN*/
/*************************/
function refresh(){
	$.mobile.loading("show"); //show loading
	location.reload(true);//refresh page
	$.mobile.loading("hide"); //hide loading
}
function exitFromApp() {
	navigator.app.exitApp();
}
//BUTTON ACTION
function btn_semua_pelanggaran(){
	//clear content on #mycontent
	get_all_report();//lihat semua report
}

function btn_tags_pelanggaran(){
	get_tags_report();
}