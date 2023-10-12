

// Loading images
const imageContainer = document.getElementById('imageContainer');
const loader = document.getElementById('loader');

let ready = false;// For creating an event to load another butch of images.
let imagesLoaded = 0;//Count numbers of images loaded to match with the number limit of images load.   
let totalImages = 0;//Initialise a var for setting number limit on images load within another func. 
//Set global variable for the photos coming from via Unsplash Api to accomodate with the values changing everytime by requests.
let photosArray = [];   

//Unsplash Api
const count = 30 ;
const apiKey = '5hSAcrO4UMHUCHRRe21GmN1xwqM1Qnlq-Jjbsu_H_IE';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// 5th Func: Check if 30 images are loaded and ready for another load. Run on each indivisual image.
function imageLoaded(){
    console.log('Image loaded');
    imagesLoaded++;//Count the numebr of loaded images.
    if (imagesLoaded === totalImages) {
        ready = true;//Make the event state ready for another load.
        console.log('ready =', ready);
    } 
}

//3rd Fun, *Dry coding: A helper fucntion for the 2nd Func to set attributes on DOM Elements without repeating setAttribute().
function setAttributes(element,attributes){
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// 2nd Func: *The core logic: Create elements for links & photos and then add to DOM.
function displayPhotos(){
    
    //Check number/length of photos in photosArray and keep the length to compare with number of images loaded. 
    totalImages = photosArray.length;
    console.log('Total images', totalImages);

    //Run function for each object/data in photosArray[].
    photosArray.forEach((photo) => {
        const imgPallet = document.createElement('a');//Create element(as a pallet) for <a> to link up with Unsplash.
        //Set attribute in the container for each attribute coming from Unsplash Api.
        // imgPallet.setAttribute('href', photo.links.html);//for href
        // imgPallet.setAttribute('target','_blank');//for target
        //Use helper func instead of repeating setAttribute() above two codes.
        setAttributes(imgPallet, {
            href: photo.links.html,
            target: '_blank',
        });

        const img = document.createElement('img');//Create element for <img> for actual photos.
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        //Use helper func instead of repeating setAttribute() above three codes.
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description, 
            title: photo.alt_description,
        });

        // Add event listener, check when each triggered event is finished loading.
        img.addEventListener('load', imageLoaded);

        //Put <img> on <a>, then contain both inside imageContainer element/id.
        imgPallet.appendChild(img);
        imageContainer.appendChild(imgPallet);

    });
}

// 1st Func :Get photos from UnSpash
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json(); //Before: const data = await response.json();
        displayPhotos();//2nd Func *The core logic.
        console.log(photosArray);//Before console.log(data);//Check if the Api url is populated.
    } catch (error) {
        //Catch error here;
    }
}

//4th Func: Core logic for keep displaying images when user scrolling near the bottom of the page.
window.addEventListener('scroll', () => {
    //console.log('scrolled');//Check how the e is triggered.
    // Load and display more photos with the event is triggered when scrolled near the bottom by setting the height limitation and the number of loaded images became 30. 
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;// Will only be ready again when anothe 30 images loaded.
        getPhotos();
        //console.log('Load more!');//Check if loaded.
    } 
});

//Call getPhotos func
getPhotos();