function myFunction(){
const API_KEY = "1a91235147f74f4fb13e628ac092a08f"
const city_name = document.getElementById("city").value
let URL = `https://api.opencagedata.com/geocode/v1/json?q=${city_name}&key=${API_KEY}&language=fr&pretty=1`

fetch(URL) // on utilise la methode fetch, qui est asynchrone et qui existe par défaut dans le navigateur (on aurait aussi pu utiliser la librairie axios par exemple)
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
})
.catch(err => console.log(err))
}