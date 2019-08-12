import React from 'react';
import { shallow } from 'enzyme';
import App from './index';
import SharedButton from '../../components/button/index';
import { findByTestAttr, testStore } from '../../../Utilities/utilities';
import Error from '../../components/Error/index';
import Loading from '../../components/Loading/index';
import Weather from '../../components/Weather/index';
import '../../setupTests';

describe('The App component connected with store '+
  '(This test needs your redux-saga version to support mock store)', ()=>{
  const setUp = (initialState={}) => {
    const store = testStore(initialState);
    const wrapper = shallow(<App store={store} />).childAt(0).dive();
    return wrapper;
  };

  describe('App Render', ()=>{
    let wrapper;
    beforeEach(() => {
      const initialState = {};
      wrapper = setUp(initialState);
    }); 
    it('Should have a search component, which includes a text input and button', ()=>{
      const component = findByTestAttr(wrapper, 'city-search');
      expect(component.length).toBe(1);
      const input = findByTestAttr(component, 'city-input');
      expect(input.length).toBe(1);
      const button = component.find(SharedButton);
      expect(button.length).toBe(1);
    });
  
    it('Should have a page display section', ()=>{
      const component = findByTestAttr(wrapper, 'page-display');
      expect(component.length).toBe(1);
    });
  });

  describe('Page rendering', ()=>{
    let wrapper;
    it('Should display the error page when there is an error with fetching data', ()=>{
      const initialState = {
        post:{
          payload: {},
          loading: false,
          error: "An error"
        }
      };
      wrapper = setUp(initialState);
      const pageWrapper = findByTestAttr(wrapper, 'page-display');
      const component = pageWrapper.find(Error);
      expect(component.length).toBe(1);
    });

    it('Should display the loading page when getting data from api', ()=>{
      const initialState = {
        post:{
          payload: {},
          loading: true,
          error: ""
        }
      };
      wrapper = setUp(initialState);
      const component = wrapper.find(Loading);
      expect(component.length).toBe(1);
    });

    it('Should show the weather page when data received from api', ()=>{
      const initialState = {
        post:{
          payload: {},
          loading: false,
          error: ""
        }
      };
      wrapper = setUp(initialState);
      const component = wrapper.find(Weather);
      expect(component.length).toBe(1);
    });
  });
});