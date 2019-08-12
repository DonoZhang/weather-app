import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr, checkProps } from '../../../Utilities/utilities';
import { offsetToTime } from './utilities';
import exampleData from './payloadJsonExample';
import Weather from './index';

describe('Weather Page', ()=>{
    describe('Checking PropTypes', ()=>{
        it('Should NOT throw a warning', ()=>{
            const testingProps = {
                payload: {name: "an object"}
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
                payload: exampleData
            }
            time = offsetToTime(props.payload.timezone);
            wrapper = shallow(<Weather {...props}/>);
            wrapper.setState({
                time: time,
                weather: {
                    weatherBrief: props.payload.weather[0].main,
                },
                city: props.payload.name
            });
        });

        it('Should render without error', ()=>{
            const component = findByTestAttr(wrapper, 'weather-page');
            expect(component.length).toBe(1);
        });

        it('Should render a city name extracted from payload property', ()=>{
            const component = findByTestAttr(wrapper, 'city-name');
            expect(component.length).toBe(1);
            expect(component.text()).toBe(props.payload.name);
        });

        it('Should render the current weather extracted from payload property', ()=>{
            const component = findByTestAttr(wrapper, 'weather-brief');
            expect(component.length).toBe(1);
            expect(component.text()).toBe(props.payload.weather[0].main);
        });

        it('Should render the current time of the city selected', ()=>{
            const component = findByTestAttr(wrapper, 'time-component');
            expect(component.length).toBe(1);
            expect(component.text()).toBe(time);
        });
    });
});