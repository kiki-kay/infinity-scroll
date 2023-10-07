

// Loading images
const imageContainer = document.getElementById('imageContainer');
const loader = document.getElementById('loader');

//Set global variable to accomodate with the value changing everytime by requests.
let photosArray = [];   

//Unsplash Api
const count = 10 ;
const apiKey = '5hSAcrO4UMHUCHRRe21GmN1xwqM1Qnlq-Jjbsu_H_IE';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
// Get photos from UnSpash
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json(); //Before: const data = await response.json();
        console.log(photosArray);//Before console.log(data);//Check if the Api url is populated.
    } catch (error) {
        //Catch error here;
    }
}

//Call getPhotos func
getPhotos();