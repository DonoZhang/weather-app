import React from 'react';
import { shallow } from 'enzyme'
import { findByTestAttr, checkProps } from '../../../Utilities/utilities';
import SharedButton from './index';

describe('SharedButton Component', ()=>{
    describe('Checking Property Types', ()=>{
        it('Should NOT throw a warning', ()=>{
            const testingProps = {
                    buttonText: 'Example Button Text',
                    emitEvent: ()=>{
                }
            };
            const proptypesWarning = checkProps(SharedButton, testingProps);
            expect(proptypesWarning).toBeUndefined();
        });
    });
    
    describe('Renders', ()=>{
        let wrapper;
        let props;
        beforeEach(()=>{
            props = {
                buttonText: 'Example Button Text',
                emitEvent: ()=>{

                }
            };
            wrapper = shallow(<SharedButton {...props}/>);
        });

        it('Should render a button', ()=>{
            const button = findByTestAttr(wrapper, 'buttonComponent');
            expect(button.length).toBe(1);
        });

        it('Should render a button with the text assigned', ()=>{
            const button = findByTestAttr(wrapper, 'buttonComponent');
            expect(button.text()).toBe(props.buttonText);
        });
    });

    describe('Function', ()=>{
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

        it('Should emit callback function on click event', ()=>{
            const button = findByTestAttr(wrapper, 'buttonComponent');
            button.simulate('click');
            const callback = mockFunction.mock.calls.length;
            expect(callback).toBe(1);
        });
    });
});
