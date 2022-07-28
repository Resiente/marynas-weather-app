let lat = null;
let lon = null;
let apiKey = "6366857ba361c7d6830bec1c6718f28b";

function showDate() {
  let now = new Date();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let currentDay = days[now.getDay()];
  let currentMonth = now.getMonth() + 1;
  let currentDate = now.getDate();
  let currentHour = now.getHours();
  let currentMinutes = now.getMinutes();
  let currentFullDate = document.querySelector("#todayDate");
  if (currentMinutes < 10) {
    currentMinutes = "0" + now.getMinutes();
  }
  currentFullDate.innerHTML =
    currentDay +
    ", " +
    currentDate +
    "/" +
    currentMonth +
    " " +
    currentHour +
    ":" +
    currentMinutes;
}
showDate();

navigator.geolocation.getCurrentPosition(showCurrentCity);

function showCurrentCity(position) {
  console.log(position);

  lat = position.coords.latitude;
  lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&&appid=${apiKey}`;
  axios.get(apiUrl).then(showCurrentCityWeather);

  function showCurrentCityWeather(response) {
    console.log(response);
    let currentCity = document.querySelector("#city");
    currentCity.innerHTML = response.data.name;
    let currentTemp = document.querySelector("#temp");
    celciusTemp = Math.round(response.data.main.temp);
    currentTemp.innerHTML = celciusTemp;
    let currentHumidity = document.querySelector("#currentHumidity");
    currentHumidity.innerHTML = response.data.main.humidity;
    let currentWind = document.querySelector("#currentWind");
    currentWind.innerHTML = Math.round(response.data.wind.speed);
    let mainIcon = document.querySelector("#mainIcon");
    mainIcon.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    displayForecast();
  }
}

function changeToCelcius() {
  let celcius = document.querySelector("#temp");
  celcius.innerHTML = celciusTemp;
  farengheitUnits.classList.remove("active");
  celciusUnits.classList.add("active");
}
function changeToFarengheit() {
  let farengheit = document.querySelector("#temp");
  farengheit.innerHTML = Math.round((celciusTemp * 9) / 5 + 32);
  farengheitUnits.classList.add("active");
  celciusUnits.classList.remove("active");
}
let celciusTemp = null;
let celciusUnits = document.querySelector("#celciusTemp");
let farengheitUnits = document.querySelector("#farengheitTemp");
celciusUnits.addEventListener("click", changeToCelcius);
farengheitUnits.addEventListener("click", changeToFarengheit);

function changeCity(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#city-input").value;
  let userSearchCity = document.querySelector("#city");
  userSearchCity.innerHTML = searchInput;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&units=metric&&appid=${apiKey}`;
  axios.get(apiUrl).then(changeWeather);

  function changeWeather(response) {
    console.log(response);
    lat = response.data.coord.lat;
    lon = response.data.coord.lon;

    let searchedCityTemp = document.querySelector("#temp");
    celciusTemp = Math.round(response.data.main.temp);
    searchedCityTemp.innerHTML = celciusTemp;
    let searchedCityHumidity = document.querySelector("#currentHumidity");
    searchedCityHumidity.innerHTML = response.data.main.humidity;
    let searchedCitytWind = document.querySelector("#currentWind");
    searchedCitytWind.innerHTML = Math.round(response.data.wind.speed);
    let mainIcon = document.querySelector("#mainIcon");
    mainIcon.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&exclude=hourly,historical,minutely&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(displayForecast);
  }
}
function displayForecast(response) {
  console.log(response);

  let fiveDayForecast = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Fri", "Sat", "Sun", "Mon", "Tue"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
          <div class="forecast-day-date">${day}</div>
          <img src="http://openweathermap.org/img/wn/02d@2x.png" class="weather-icon" alt="">
          <div class="forecast-average-temperature">25℃</div>
          <span class="forecast-day-temperature">25/</span>
          <span class="forecast-night-temperature">17</span>
        </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  fiveDayForecast.innerHTML = forecastHTML;
}
let searchInput = document.querySelector(".search");
searchInput.addEventListener("submit", changeCity);
