import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr, checkProps } from '../../../Utilities/utilities';
import SharedTextInput from './index';

describe('Text input component', ()=>{

    describe('Property types check', ()=>{
        let testingProps = {
                placeholder: "",
                emitEvent: ()=>{}
            };
 
        it('Should NOT throw a warning', ()=>{
            const propsError = checkProps(SharedTextInput, testingProps);
            expect(propsError).toBeUndefined();
        });
    });

    describe('Render', ()=>{
        let wrapper;
        let props;
        beforeEach(()=>{
            props={
                placeholder: "Please enter something",
                emitEvent: ()=>{

                }
            }
            wrapper=shallow(<SharedTextInput {...props} />)
        });

        it('Should render without error', ()=>{
            const component = findByTestAttr(wrapper, 'text-input');
            expect(component.length).toBe(1);
        });

        it('Should include a text input whose placeholder is assigned by property', ()=>{
            const component = wrapper.find('input[type="text"]');
            expect(component.length).toBe(1);
            expect(component.prop('placeholder')).toBe(props.placeholder);
        });
    });

    describe('Function to capture data entered', ()=>{
        let wrapper;
        let props;
        beforeEach(()=>{
            props = {
                placeholder: "Please enter something",
                emitEvent: ()=>{}
            }
            wrapper = shallow(<SharedTextInput {...props} />);
        });

        it('Should update state on text change', ()=>{
            const component = wrapper.find('input[type="text"]');
            const testingData = "any string";
            component.simulate('change', {target: {value: testingData}});
            expect(wrapper.state().textEntered).toBe(testingData);
        });
    });

    describe('Function to pass data entered out', ()=>{
        let wrapper;
        let props;
        const mockedFunction = jest.fn();
        beforeEach(()=>{
            props = {
                placeholder: "Please enter something",
                emitEvent: mockedFunction
            }
            wrapper = shallow(<SharedTextInput {...props} />);
        });

        it('Should fire the emit function with the text entered on text change', ()=>{
            const component = wrapper.find('input[type="text"]');
            const testingData = "any string";
            component.simulate('change', {target: {value: testingData}});
            expect(mockedFunction).toHaveBeenCalledWith(testingData);
        });
    });
});