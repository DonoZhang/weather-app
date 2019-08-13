import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { offsetToTime } from './utilities';

class Weather extends Component{
    static propTypes = {
        timezone: PropTypes.number,
        weather: PropTypes.object,
        city: PropTypes.string
    }

    constructor(props){
        super(props);
        this.state = {
            time: null
        }
    }

    componentDidMount(){
        this._updateTime();
        //update time per half minute
        this.timeUpdater = setInterval(this._updateTime, 30000);
    }

    componentWillUnmount(){
        clearInterval(this.timeUpdater);
    }

    _updateTime = ()=>{
        this.setState({
            time: offsetToTime(this.props.timezone)
        });
    }

    render(){
        const city = this.props.city;
        const weather = this.props.weather;
        return (
            <div className="weather-page" data-test="weather-page">
                <div className="city-name" data-test="city-name">
                    {city}
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