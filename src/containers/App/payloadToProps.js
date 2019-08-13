export const payloadToProps = (payload)=>{
    let weather;
    let city;
    let timezone;
    weather = {
        weatherBrief: payload.weather[0].main,
        weatherDescription: payload.weather[0].description,
        icon: payload.weather[0].icon,
        temperature: payload.main.temp,
        temperatureLow: payload.main.temp_min,
        temperatureHight: payload.main.temp_max,
        visibility: payload.visibility,
        windSpeed: payload.wind.speed,
        windDegree: payload.wind.deg,
        sunrise: payload.sys.sunrise,
        sunset: payload.sys.sunset
    };
    city = payload.name;
    timezone = payload.timezone;
    return {weather, city, timezone}
}