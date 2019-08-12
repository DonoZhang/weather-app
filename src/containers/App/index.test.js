import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from './index';
import { findByTestAttr } from '../../../Utilities/utilities';
import '../../setupTests';

const setUp = (props = {}) =>{
  const component = shallow(<App {...props} />);
  return component;
}

describe('App', ()=>{
  let component;
  beforeEach(() => {
      component = setUp();
  });

  it('Should render nothing', ()=>{
      const wrapper = findByTestAttr(component, 'headerComponent');
      expect(wrapper.length).toBe(0);
  });
});