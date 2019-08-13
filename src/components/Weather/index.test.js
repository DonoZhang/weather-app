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
                    weatherBrief: "cloud"
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

        it('Should render the current weather brief assigned by property', ()=>{
            const component = findByTestAttr(wrapper, 'weather-brief');
            expect(component.length).toBe(1);
            expect(component.text()).toBe(props.weather.weatherBrief);
        });

        it('Should render a time using the time state', ()=>{
            const component = findByTestAttr(wrapper, 'time-component');
            expect(component.length).toBe(1);
            expect(component.text()).toBe(time);
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