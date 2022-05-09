function myFunction(){
const CAGEDATA_API_KEY = "c51703746f42417aad34698a35135e7b"
const WEATHERMAP_API_KEY = "26f95dc23fad5b112f7c3fbf3a8a102c"
// let latitude;
// let longitude;
const city_name = document.getElementById("city").value
const CAGEDATA_URL = `https://api.opencagedata.com/geocode/v1/json?q=${city_name}&key=${CAGEDATA_API_KEY}&language=fr&pretty=1`


fetch(CAGEDATA_URL) // on utilise la methode fetch, qui est asynchrone et qui existe par défaut dans le navigateur (on aurait aussi pu utiliser la librairie axios par exemple)
// on utilise la méthode then() (NB: on pourrait aussi utiliser la syntaxe async/await)
.then(response => { 
    if (response.status == 200) { // on vérifier que l'appel à l'API a fonctionné
        return response.json()  // ne pas oublier le return du callback
    }
    else console.log(`Erreur lorsqu'on a tenté de récupérer les data`);
})
.then(data => {
    const latitude = data.results[0].geometry.lat;
    const longitude = data.results[0].geometry.lng;
    console.log(`La latitude de ${city_name} est ${latitude}`)
    console.log(`La longitude de ${city_name} est ${longitude}`)
    const WEATHERMAP_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHERMAP_API_KEY}`
    fetch(WEATHERMAP_URL)
    .then(response => {
        return response.json()
    })
    .then(data => {
        console.log(data)
    })
    .catch(err => console.log(err))
})
.catch(err => console.log(err))

}