//example data fetched from https://api.openweathermap.org/data/2.5/weather?q=Melbourne,AU&units=metric&APPID=42905b45c73a2763dd8827a8d802be68
export default {
    coord: {
        lon: 144.96,
        lat: -37.81
    },
    weather: [
        {
            id: 804,
            main: "Clouds",
            description: "overcast clouds",
            icon: "04n"
        }
    ],
    base: "stations",
    main: {
        temp: 8.58,
        pressure: 1025,
        humidity: 76,
        temp_min: 6.11,
        temp_max: 10
    },
    visibility: 10000,
    wind: {
        speed: 3.6,
        deg: 280
    },
    clouds: {
        all: 90
    },
    dt: 1565613318,
    sys: {
        type: 1,
        id: 9548,
        message: 0.0083,
        country: "AU",
        sunrise: 1565557774,
        sunset: 1565595675
    },
    timezone: 36000,
    id: 2158177,
    name: "Melbourne",
    cod: 200
}