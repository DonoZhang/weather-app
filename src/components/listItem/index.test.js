import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr, checkProps } from '../../../Utilities/utilities';
import ListItem from './index';

describe('ListItem Component', ()=>{
    describe('Checking PropTypes', ()=>{
        it('Should NOT throw a warning', ()=>{
            const expectedProps = {
                time: '12:00',
                image: 'https://openweathermap.org/img/w/04n.png',
                temperature: '13'
            };
            const propsError = checkProps(ListItem, expectedProps);
            expect(propsError).toBeUndefined();
        });
    });

    describe('Component renders', ()=>{
        let wrapper;
        beforeEach(()=>{
            const props = {
                time: '12:00',
                image: 'https://openweathermap.org/img/w/04n.png',
                temperature: '13'
            };
            wrapper = shallow(<ListItem {...props}/>);
        });

        it('Should render without error', ()=>{
            const component = findByTestAttr(wrapper, 'listItemComponent');
            expect(component.length).toBe(1);
        });

        it('Should render a time', ()=>{
            const component = findByTestAttr(wrapper, 'time');
            expect(component.length).toBe(1);
        });

        it('Should render a weather symbol', ()=>{
            const component = findByTestAttr(wrapper, 'symbol');
            expect(component.length).toBe(1);
        });

        it('Should render the temperature', ()=>{
            const component = findByTestAttr(wrapper, 'temperature');
            expect(component.length).toBe(1);
        });
    });

    describe('Should NOT render', ()=>{
        const props1 = {
            image: 'https://openweathermap.org/img/w/04n.png',
            temperature: '13'
        };
        const props2 = {
            time: '12:00',
            temperature: '13'
        };
        const props3 = {
            time: '12:00',
            image: 'https://openweathermap.org/img/w/04n.png'
        };
        const props4 = {
            time: '12:00',
            image: 'https://openweathermap.org/img/w/04n.png',
            temperature: '13'
        };

        let wrapper1 = shallow(<ListItem {...props1}/>);
        let wrapper2 = shallow(<ListItem {...props2}/>);
        let wrapper3 = shallow(<ListItem {...props3}/>);
        let wrapper4 = shallow(<ListItem {...props4}/>);
        it('List item should not render when time property is not specified', ()=>{
            const component = findByTestAttr(wrapper1, 'listItemComponent');
            expect(component.length).toBe(0);
        });
        
        it('List item should not render when image property is not specified', ()=>{
            const component = findByTestAttr(wrapper2, 'listItemComponent');
            expect(component.length).toBe(0);
        });

        it('List item should not render when temperature property is not specified', ()=>{
            const component = findByTestAttr(wrapper3, 'listItemComponent');
            expect(component.length).toBe(0);
        });

        it('List item should render when all properties are specified', ()=>{
            const component = findByTestAttr(wrapper4, 'listItemComponent');
            expect(component.length).toBe(1);
        });
    });
});
