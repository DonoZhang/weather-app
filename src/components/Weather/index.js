import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { offsetToTime } from './utilities';

class Weather extends Component{
    static propTypes = {
        payload: PropTypes.object
    }

    constructor(props){
        super(props);
        this.state = {
            time: null,
            weather: null,
            city: null
        }
    }

    componentWillMount(){
        this.setState({city: this.props.payload.name});
        this._updateTime();
        this._updateWeather();
        //update time per half minute
        this.timeUpdater = setInterval(this._updateTime, 30000);
        //update weather per hour
        this.weatherUpdater = setInterval(this._updateWeather, 3600000);
    }

    componentWillUnmount(){
        clearInterval(this.timeUpdater);
        clearInterval(this.weatherUpdater);
    }

    _updateTime = ()=>{
        this.setState({
            time: offsetToTime(this.props.payload.timezone)
        });
    }

    _updateWeather = ()=>{
        const payload = this.props.payload;
        this.setState({
            weather:
            {
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
            }
        });
    }

    render(){
        const weather = this.state.weather;
        return (
            <div className="weather-page" data-test="weather-page">
                <div className="city-name" data-test="city-name">
                    {this.state.city}
                </div>
                <div className="weather-brief" data-test="weather-brief">
                    {weather.weatherBrief}
                </div>
                <div className="time-component" data-test="time-component">
                    {this.state.time}
                </div>
            </div>
        );
    }
}

export default Weather;