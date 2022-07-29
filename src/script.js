function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function displayWeatherCondition(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#currentTemp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#feels-like").innerHTML = Math.round(response.data.main.feels_like);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#icon").setAttribute("src", `images/${response.data.weather[0].icon}.png`);

  celsiusTemp = response.data.main.temp;

  getForecast(response.data.coord);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Fri", "Sat", "Sun", "Mon", "Tue"];
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      forecastHTML = forecastHTML +
        `<div class="col">
    <ul class="col_nextWeather">
      <li class="dayOfWeek">${formatDay(forecastDay.dt)}</li>
      <li><img src="images/${forecastDay.weather[0].icon}.png" width="50"></li>
      <li class="max-temp">${Math.round(forecastDay.temp.max)}°</li>
      <li class="min-temp">${Math.round(forecastDay.temp.min)}°</li>
    </ul>
  </div>    `
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "114b8a20a2b44f123e7028962d0803b9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function searchCity(city) {
  let apiKey = "114b8a20a2b44f123e7028962d0803b9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "114b8a20a2b44f123e7028962d0803b9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude
    }&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#btn-current");
currentLocationButton.addEventListener("click", getCurrentLocation);

function showFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemp * 9 / 5) + 32;
  let tempElement = document.querySelector("#currentTemp");
  tempElement.innerHTML = Math.round(fahrenheitTemp);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#currentTemp");
  tempElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

// var currentImg = document.getElementById('#col-currentTemp');

// function changeBgImg() {
//   if (temp - description === clouds)
//     newCurrentImg = "url('https://cdn-icons.flaticon.com/png/512/3222/premium/3222677.png?token=exp=1658162648~hmac=1ef5e3dad0f3e7a98d753e32d3bfcb1c')";
// }

// changeBgImg();

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

searchCity("Kyiv");