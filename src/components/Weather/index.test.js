import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr, checkProps } from '../../../Utilities/utilities';
import { offsetToTime } from './utilities';
import Weather from './index';

describe('Weather Page', ()=>{
    describe('Checking PropTypes', ()=>{
        it('Should NOT throw a warning', ()=>{
            const testingProps = {
                city: "Melbourne",
                timezone: 36000,
                weather: {}
            };
            const propsError = checkProps(Weather, testingProps);
            expect(propsError).toBeUndefined();
        });
    });

    describe('Render', ()=>{
        let wrapper;
        let props;
        let time;
        beforeEach(()=>{
            props={
                city: "Melbourne",
                timezone: 36000,
                weather: {
                    weatherBrief: "cloud",
                    temperature: "8.56",
                    icon: "04n",
                    temperatureHigh: "10.22",
                    temperatureLow: "6.02"
                }
            }
            time = offsetToTime(props.timezone);
            wrapper = shallow(<Weather {...props}/>);
            wrapper.setState({time});
        });

        it('Should render without error', ()=>{
            const component = findByTestAttr(wrapper, 'weather-page');
            expect(component.length).toBe(1);
        });

        it('Should render a city name assigned by property', ()=>{
            const component = findByTestAttr(wrapper, 'city-name');
            expect(component.length).toBe(1);
            expect(component.text()).toBe(props.city);
        });

        it('Should render a time using the time state', ()=>{
            const component = findByTestAttr(wrapper, 'time-component');
            expect(component.length).toBe(1);
            expect(component.text()).toBe(time);
        });

        it('Should render an icon for the current weather', ()=>{
            const component = findByTestAttr(wrapper, 'weather-icon');
            expect(component.length).toBe(1);
            const expectedSrc = `https://openweathermap.org/img/w/${props.weather.icon}.png`;
            expect(component.find('img').prop('src')).toBe(expectedSrc);
        });

        it('Should render the current weather brief assigned by property', ()=>{
            const component = findByTestAttr(wrapper, 'weather-brief');
            expect(component.length).toBe(1);
            expect(component.text()).toBe(props.weather.weatherBrief);
        });

        it('Should render the current temperature', ()=>{
            const component = findByTestAttr(wrapper, 'temperature');
            expect(component.length).toBe(1);
            expect(component.text()).toBe( props.weather.temperature + "℃");
        });

        it('Should render the temperature range of the day, which includes the highest temperature and the lowest', ()=>{
            const component = findByTestAttr(wrapper, 'temperature-range');
            expect(component.length).toBe(1);
            const componentHighest = findByTestAttr(component, 'temperature-highest');
            const componentLowest = findByTestAttr(component, 'temperature-lowest');
            expect(componentHighest.length).toBe(1);
            expect(componentHighest.text()).toBe(props.weather.temperatureHigh + "℃");
            expect(componentLowest.length).toBe(1);
            expect(componentLowest.text()).toBe(props.weather.temperatureLow + "℃");
        });
    });

    describe('Function', ()=>{
        let wrapper;
        let props;
        let time;
        beforeEach(()=>{
            props={
                city: "Melbourne",
                timezone: 36000,
                weather: {
                    weatherBrief: "cloud"
                }
            }
            time = offsetToTime(props.timezone);
            wrapper = shallow(<Weather {...props}/>);
        });

        it('_updateTime should update time state as expected', ()=>{
            const classInstance = wrapper.instance();
            classInstance._updateTime();
            const newState = classInstance.state.time;
            expect(newState).toBe(time);
        });
    });
});