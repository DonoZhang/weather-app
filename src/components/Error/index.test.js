import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr, checkProps } from '../../../Utilities/utilities';
import Error from './index';

describe('Error page', ()=>{
    describe('Check PropTypes',()=>{
        it('Should NOT throw a warning', ()=>{
            const testingProps = {
                errorMessage: "An error"
            }
            const proptypesWarning = checkProps(Error, testingProps);
            expect(proptypesWarning).toBeUndefined();
        });
    });

    describe('Renders', ()=>{
        let wrapper;
        let props;
        beforeEach(()=>{
            props = {
                errorMessage: "An error message"
            }
            wrapper = shallow(<Error {...props}/>);
        });

        it('Page should render without error', ()=>{
            const component = findByTestAttr(wrapper, 'error-page');
            expect(component.length).toBe(1);
        });

        it('Should render a message block', ()=>{
            const component = findByTestAttr(wrapper, 'error-message');
            expect(component.length).toBe(1);
        });

        it('Should render the message block with the error message assigned', ()=>{
            const component = findByTestAttr(wrapper, 'error-message');
            expect(component.text()).toBe(props.errorMessage);
        });
    });
});

