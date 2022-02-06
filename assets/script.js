var searchFormEl = document.querySelector('#search-form');
var cityInputEl = document.querySelector('#city');
var cityContainerEl = document.querySelector('#city-container');
var seachHistory = document.querySelector('#search-hisgtory');

var key = "d209e8341b90d4fc42e389a65bce52fd";

var formSubmitHandler = function (event) {
    event.preventDefault();


    var cityName = cityInputEl.value;

    if (cityName) {
        getWeather(cityName);
    } else {
        alert('Please enter a City Name');
    };
}
var getWeather = function (cityName) {

    var apiUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid="+key;
    var currentWeather = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}`;

    fetch(currentWeather)
        .then(function (response) {
            if (response.ok) {
   
                response.json().then(function (data) {
                    console.log(data);
                    var lat = data.coord.lat;
                    var lon = data.coord.lon;
                    getForecast(lat,lon,cityName);

                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to Openweathermap');
        });
};

searchFormEl.addEventListener("submit",formSubmitHandler)

var getForecast = function(lat, lon, cityName) {
    var weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutelyhourlyalerts&appid=${key}&units=imperial`
    fetch(weatherUrl)
        .then(function (response) {
            if (response.ok) {
   
                response.json().then(function (data) {
                    console.log(data);
                                       displayCities(data,cityName);
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to Openweathermap');
        });
}

//getWeather("Miami");

function displayCities(apiresult,cityName){
    document.getElementById('returnedCity').textContent = cityName
    document.getElementById('temp').textContent = "Temp :" + apiresult.current.wind_speed
    document.getElementById('humidity').textContent = "Humidity :" + apiresult.current.humidity
    document.getElementById('wind').textContent = "Wind : " + apiresult.current.wind_speed
    document.getElementById('uvIndex').textContent = "UVIndex :" + apiresult.current.uvi
    document.getElementById('icon').setAttribute('src', `http://openweathermap.org/img/wn/${apiresult.current.weather[0].icon}@2x.png`)
}