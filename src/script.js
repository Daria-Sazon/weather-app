function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];

  let monthIndex = date.getMonth();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let month = months[monthIndex];

  let dates = date.getDate();

  return `${dates} ${month}, ${day} ${hours}:${minutes}`;
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
  document.querySelector("#icon").setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  celsiusTemp = response.data.main.temp;
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
  celsiusLink.classList.remove("units-hover");
  fahrenheitLink.classList.add("units-hover");
  let fahrenheitTemp = (20 * 9/5) + 32;
  let tempElement = document.querySelector("#currentTemp");
  tempElement.innerHTML = Math.round(fahrenheitTemp);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("units-hover");
  celsiusLink.classList.add("units-hover");
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