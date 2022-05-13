var input = document.getElementById("city");
input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    forecastFunction();
  }
});

const CAGEDATA_API_KEY = "c51703746f42417aad34698a35135e7b";
const WEATHERMAP_API_KEY = "26f95dc23fad5b112f7c3fbf3a8a102c";
const week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
var imgSrc = "";
var codeMeteo = 0;
var day = "";

function getWeatherFromApi(latitude, longitude, city_name) {
  var ajd = new Date();
  var indexDay = ajd.getDay();
  const WEATHERMAP_URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${WEATHERMAP_API_KEY}`;
  fetch(WEATHERMAP_URL)
    .then((response) => {
      if (localStorage.getItem(city_name)) {
        console.log("déjà enregistré")
        return JSON.parse(localStorage.getItem(city_name));
      } else {
        console.log("à enregistrer")
        return response.json();
      }
    })
    .then((data) => {
      localStorage.setItem(city_name, JSON.stringify(data));

      forecasts.innerHTML = "";
      nbForecast = document.getElementById("nbDay").value;
      for (let i = 0; i < nbForecast; i++) {
        day = week[indexDay];
        codeMeteo = data.hourly[i].weather[0].id;

        if (data.hourly[0].uvi == 0) {
          document.body.style.background = "";
          document.body.style.transition = "all 1s";
          document.body.style.background =
            "linear-gradient(#01091F, #3776FB) fixed";
          document.body.style.color = "white";
          if (codeMeteo == 800) {
            imgSrc = "./assets/images/sun-white.png";
          } else if (codeMeteo == 801 || codeMeteo == 802) {
            imgSrc = "./assets/images/cloudy-white.png";
          } else if (codeMeteo == 803 || codeMeteo == 804) {
            imgSrc = "./assets/images/clouds-white.png";
          } else if (codeMeteo >= 600 && codeMeteo <= 622) {
            imgSrc = "./assets/images/snow-white.png";
          } else if (codeMeteo >= 500 && codeMeteo <= 531) {
            imgSrc = "./assets/images/rain-white.png";
          }
        } else {
          document.body.style.background = "";
          document.body.style.backgroundColor = "#19c8e3";
          document.body.style.color = "black";
          if (codeMeteo == 800) {
            imgSrc = "./assets/images/sun.svg";
          } else if (codeMeteo == 801 || codeMeteo == 802) {
            imgSrc = "./assets/images/cloudy.svg";
          } else if (codeMeteo == 803 || codeMeteo == 804) {
            imgSrc = "./assets/images/clouds.svg";
          } else if (codeMeteo >= 600 && codeMeteo <= 622) {
            imgSrc = "./assets/images/snow.svg";
          } else if (codeMeteo >= 500 && codeMeteo <= 531) {
            imgSrc = "./assets/images/rain.svg";
          }
        }

        let addDiv = document.createElement("div");
        addDiv.classList = "forecast";
        let addH3 = document.createElement("H3");
        let textH3 = document.createTextNode(day);
        let addImg = document.createElement("img");
        addImg.src = imgSrc;
        addH3.appendChild(textH3);
        addDiv.appendChild(addH3);
        addDiv.appendChild(addImg);
        document.getElementById("forecasts").appendChild(addDiv);

        if (indexDay + 1 == 7) {
          indexDay = 0;
        } else {
          indexDay++;
        }
      }
    })
    .catch((err) => console.log(err));
}

function forecastFunction() {
  const city_name = document.getElementById("city").value.toLowerCase();
  const CAGEDATA_URL = `https://api.opencagedata.com/geocode/v1/json?q=${city_name}&key=${CAGEDATA_API_KEY}&language=fr&pretty=1`;

  fetch(CAGEDATA_URL)
    .then((response) => {
      if (response.status == 200) {
        return response.json();
      } else console.log(`Erreur lorsqu'on a tenté de récupérer les data`);
    })
    .then((data) => {
      const latitude = data.results[0].geometry.lat;
      const longitude = data.results[0].geometry.lng;
      getWeatherFromApi(latitude, longitude, city_name);
    })
    .catch((err) => console.log(err));
}
