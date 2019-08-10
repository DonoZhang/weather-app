import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from './App';
import { findByTestAttr } from './Utilities/testingUtilities'
import './setupTests';

const setUp = (props = {}) =>{
  const component = shallow(<App {...props} />);
  return component;
}

describe('Header Component', ()=>{
  let component;
  beforeEach(() => {
      component = setUp();
  });

  it('Should render without errors', ()=>{
      const wrapper = findByTestAttr(component, 'headerComponent');
      expect(wrapper.length).toBe(1);
  });

  it('Should render a logo', ()=>{
      const logo = findByTestAttr(component, 'logoIMG');
      expect(logo.length).toBe(1);
  });
});