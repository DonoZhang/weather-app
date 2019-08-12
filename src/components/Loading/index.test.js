import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr } from '../../../Utilities/utilities';
import Loading from './index';

describe('Loading page', ()=>{
    let wrapper;
    beforeEach(()=>{
        wrapper = shallow(<Loading />);
    });

    it('Should render without error', ()=>{
        const component = findByTestAttr(wrapper, 'loading-page');
        expect(component.length).toBe(1);
    });

    it('Should render a loading image', ()=>{
        const component = findByTestAttr(wrapper, 'loading-image');
        expect(component.length).toBe(1);
    });
});