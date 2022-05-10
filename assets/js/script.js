function myFunction() {
  const CAGEDATA_API_KEY = "c51703746f42417aad34698a35135e7b";
  const WEATHERMAP_API_KEY = "26f95dc23fad5b112f7c3fbf3a8a102c";
  let ladate = new Date();
  let week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let indexDay = ladate.getDay();
  const city_name = document.getElementById("city").value;
  const CAGEDATA_URL = `https://api.opencagedata.com/geocode/v1/json?q=${city_name}&key=${CAGEDATA_API_KEY}&language=fr&pretty=1`;
  let imgSrc = "";
  let codeMeteo = 0;
  let day = "";

  fetch(CAGEDATA_URL) // on utilise la methode fetch, qui est asynchrone et qui existe par défaut dans le navigateur (on aurait aussi pu utiliser la librairie axios par exemple)
    // on utilise la méthode then() (NB: on pourrait aussi utiliser la syntaxe async/await)
    .then((response) => {
      if (response.status == 200) {
        // on vérifier que l'appel à l'API a fonctionné
        return response.json(); // ne pas oublier le return du callback
      } else console.log(`Erreur lorsqu'on a tenté de récupérer les data`);
    })
    .then((data) => {
      const latitude = data.results[0].geometry.lat;
      const longitude = data.results[0].geometry.lng;
      console.log(`La latitude de ${city_name} est ${latitude}`);
      console.log(`La longitude de ${city_name} est ${longitude}`);

      const WEATHERMAP_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${WEATHERMAP_API_KEY}`;
      fetch(WEATHERMAP_URL)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          forecasts.innerHTML = "";
          console.log(data);
          console.log(week[indexDay]);
          console.log(document.getElementById("nbDay").value);
          nbForecast = document.getElementById("nbDay").value;
          for (let i = 0; i < nbForecast; i++) {
            day = week[indexDay];
            codeMeteo = data.list[i].weather[0].id;
            console.log(codeMeteo);

            if (codeMeteo == 800) {
              imgSrc = "./assets/images/clouds.svg";
            } else if (codeMeteo == 801 || codeMeteo == 802) {
              imgSrc = "./assets/images/cloudy.svg";
            } else if (codeMeteo == 803 || codeMeteo == 804) {
              imgSrc = "./assets/images/clouds.svg";
            } else if (codeMeteo >= 600 && codeMeteo <= 622) {
              imgSrc = "./assets/images/snow.svg";
            } else if (codeMeteo >= 500 && codeMeteo <= 531) {
              imgSrc = "./assets/images/rain.svg";
            }

            let d = document.createElement("div");
            d.classList = "forecast";
            let h = document.createElement("H3");
            let t = document.createTextNode(day);
            let img = document.createElement("img");
            img.src = imgSrc;
            h.appendChild(t);
            d.appendChild(h);
            d.appendChild(img);
            document.getElementById("forecasts").appendChild(d);
            if (indexDay + 1 == 7) {
              indexDay = 0;
            } else {
              indexDay++;
            }
          }
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}
