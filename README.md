Weather App
v1: melbourne only
City
    weather
        Temp

Day today?
    hourly forecast from now
        time
        logo
        temp
day
...

Today: description
details:
    sunrise sunset
    chance of rain  humidity
    wind    feels like
    precipitation   pression
    visibility  UV index
    


    Enter town or postcode (http://v0.postcodeapi.com.au/suburbs/3066.json)
        dispatch town/put postcode
    Cityname to time:
    Cityname to weather:
    https://api.openweathermap.org/data/2.5/weather?q=Perth,AU&cnt=1&units=metric&APPID=f218cbbb0b02c7e49e39d98710036bb4
    
     
localStorage: the city

reducer:
    standardized city name
    weather
    time


datetime:

var offset = 36000;

var utc = Date.now();

var locale = utc + offset*1000;

console.log(new Date(locale).toUTCString());