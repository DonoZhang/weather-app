import React from 'react';
import { shallow } from 'enzyme';
import City from './index';
import SharedButton from '../../components/button/index';
import { findByTestAttr, testStore } from '../../../Utilities/utilities';
import '../../setupTests';

describe('The connected city component (This test needs redux-saga support for mock store)', ()=>{
  const setUp = (initialState={}) => {
    const store = testStore(initialState);
    const wrapper = shallow(<City store={store} />).childAt(0).dive();
    return wrapper;
  };

  let wrapper;
  beforeEach(() => {
    const initialState = {};
    wrapper = setUp(initialState);
  }); 

  it('Should include a text input', ()=>{
    const component = findByTestAttr(wrapper, 'city-input')
    expect(component.length).toBe(1);
  });
  
  it('Should include a submit button', ()=>{
    const component = wrapper.find(SharedButton);
    expect(component.length).toBe(1);
  });

  it('Should have a property of default city', ()=>{
    const component = findByTestAttr(wrapper, 'city-display')
    expect(component.length).toBe(1);
  });
});