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
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "6366857ba361c7d6830bec1c6718f28b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&&appid=${apiKey}`;
  axios.get(apiUrl).then(showCurrentCityWeather);
  function showCurrentCityWeather(response) {
    console.log(response);
    let currentCity = document.querySelector("#city");
    currentCity.innerHTML = response.data.name;
    let currentTemp = document.querySelector("#temp");
    currentTemp.innerHTML = Math.round(response.data.main.temp);
    let currentHumidity = document.querySelector("#currentHumidity");
    currentHumidity.innerHTML = response.data.main.humidity;
    let currentWind = document.querySelector("#currentWind");
    currentWind.innerHTML = Math.round(response.data.wind.speed);
    function changeToCelcius() {
      let celciusTemp = document.querySelector("#temp");
      celciusTemp.innerHTML = Math.round(response.data.main.temp);
    }
    function changeToFarengheit() {
      let farengheitTemp = document.querySelector("#temp");
      farengheitTemp.innerHTML = Math.round(response.data.main.temp + 32);
    }
    let celciusUnits = document.querySelector("#celciusTemp");
    let farengheitUnits = document.querySelector("#farengheitTemp");
    celciusUnits.addEventListener("click", changeToCelcius);
    farengheitUnits.addEventListener("click", changeToFarengheit);
  }
}

function changeCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input").value;

  let userSearchCity = document.querySelector("#city");
  userSearchCity.innerHTML = searchInput;
  let apiKey = "6366857ba361c7d6830bec1c6718f28b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&units=metric&&appid=${apiKey}`;
  axios.get(apiUrl).then(changeWeather);
  function changeWeather(response) {
    console.log(response);
    let searchCityTemp = document.querySelector("#temp");
    searchCityTemp.innerHTML = Math.round(response.data.main.temp);
    let searchCityHumidity = document.querySelector("#currentHumidity");
    searchCityHumidity.innerHTML = response.data.main.humidity;
    let searchCitytWind = document.querySelector("#currentWind");
    searchCitytWind.innerHTML = Math.round(response.data.wind.speed);
    function changeToCelcius() {
      let celciusTemp = document.querySelector("#temp");
      celciusTemp.innerHTML = Math.round(response.data.main.temp);
    }
    function changeToFarengheit() {
      let farengheitTemp = document.querySelector("#temp");
      farengheitTemp.innerHTML = Math.round(response.data.main.temp + 32);
    }
    let celciusUnits = document.querySelector("#celciusTemp");
    let farengheitUnits = document.querySelector("#farengheitTemp");
    celciusUnits.addEventListener("click", changeToCelcius);
    farengheitUnits.addEventListener("click", changeToFarengheit);
  }
}
let searchInput = document.querySelector(".search");
searchInput.addEventListener("submit", changeCity);
