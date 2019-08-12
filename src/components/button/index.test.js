import React from 'react';
import { shallow } from 'enzyme'
import { findByTestAttr, checkProps } from '../../../Utilities/utilities';
import SharedButton from './index';
import { call } from 'redux-saga/effects';

describe('SharedButton Component', ()=>{
    describe('Checking Property Types', ()=>{
        it('Should NOT throw a warning', ()=>{
            const expectedProps = {
                    buttonText: 'Example Button Text',
                    emitEvent: ()=>{
                }
            };
            const propsError = checkProps(SharedButton, expectedProps);
            expect(propsError).toBeUndefined();
        });
    });
    
    describe('Renders', ()=>{
        let wrapper;
        let mockFunction;
        beforeEach(()=>{
            mockFunction = jest.fn();
            const props = {
                buttonText: 'Example Button Text',
                emitEvent: mockFunction
            };
            wrapper = shallow(<SharedButton {...props}/>);
        });

        it('Should render a button', ()=>{
            const button = findByTestAttr(wrapper, 'buttonComponent');
            expect(button.length).toBe(1);
        });

        it('Should emit callback function on click event', ()=>{
            const button = findByTestAttr(wrapper, 'buttonComponent');
            button.simulate('click');
            const callback = mockFunction.mock.calls.length;
            expect(callback).toBe(1);
        });
    });
});
