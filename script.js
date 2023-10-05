
//Unsplash Api
const count = 10 ;
const apiKey = '5hSAcrO4UMHUCHRRe21GmN1xwqM1Qnlq-Jjbsu_H_IE';
const apiUrl = 'https://api.unsplash.com/photos/random/?client_id=5hSAcrO4UMHUCHRRe21GmN1xwqM1Qnlq-Jjbsu_H_IE';

// Get photos from UnSpash
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);//Check if the Api url is loaded.
    } catch (error) {
        //Catch error here;
    }
}

//Call getPhotos func
getPhotos();