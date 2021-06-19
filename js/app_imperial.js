const api = {
    key: "65c342a2d46304f6fb78f52891455eb4",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector(".search-box")
searchbox.addEventListener("keypress", setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchbox.value);
        console.log('Info/Weather for ' + searchbox.value + ':'); 
    }
}

function getResults (query) {
    fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);
}

function displayResults (weather) {
    console.log(weather);
    let city = document.querySelector(".location .city")
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector(".location .date")
    date.innerText = dateBuilder(now);

    let temp = document.querySelector(".current .temp")
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°F</span`;

    let weather_el = document.querySelector(".current .weather");
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector(".hi-low");
    hilow.innerText = `${Math.round(weather.main.temp_min)}°F / ${Math.round(weather.main.temp_max)} °F`
}

function dateBuilder (db) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[db.getDay()];
    let date = db.getDate();
    let month = months[db.getMonth()];
    let year = db.getFullYear();
  
    return `${day} ${date} ${month} ${year}`;
  }