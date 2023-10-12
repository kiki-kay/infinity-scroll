

// Loading images
const imageContainer = document.getElementById('imageContainer');
const loader = document.getElementById('loader');

//Set global variable for the photos coming from via Unsplash Api to accomodate with the value changing everytime by requests.
let photosArray = [];   

//Unsplash Api
const count = 10 ;
const apiKey = '5hSAcrO4UMHUCHRRe21GmN1xwqM1Qnlq-Jjbsu_H_IE';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//*Dry coding: A helper fucntion for the 2nd Func to set attributes on DOM Elements without repeating setAttribute().
function setAttributes(element,attributes){
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// 2nd Func: *The core logic: Create elements for links & photos and then add to DOM.
function displayPhotos(){
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

//Call getPhotos func
getPhotos();