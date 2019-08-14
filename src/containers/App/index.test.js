import React from 'react';
import { shallow } from 'enzyme';
import App from './index';
import SharedButton from '../../components/button/index';
import SharedTextInput from '../../components/input/index';
import { findByTestAttr, testStore } from '../../../Utilities/utilities';
import Error from '../../components/Error/index';
import Loading from '../../components/Loading/index';
import Weather from '../../components/Weather/index';
import examplePayload from './examplePayload';
import '../../setupTests';
import { actions } from '../../actions/actions';

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
      wrapper = setUp();
    }); 
    it('Should have a search component, which includes a text input and button', ()=>{
      const component = findByTestAttr(wrapper, 'city-search');
      expect(component.length).toBe(1);
      const input = component.find(SharedTextInput);
      expect(input.length).toBe(1);
      const button = component.find(SharedButton);
      expect(button.length).toBe(1);
    });
  
    it('Should have a page display section', ()=>{
      const component = findByTestAttr(wrapper, 'page-display');
      expect(component.length).toBe(1);
    });
  });

  describe('City setting integration test', ()=>{
    describe('City dispatch', ()=>{
      const mockedFunction = jest.fn();
      const testingCity = "Testing City";
      const initialState = {
        city:{
          city: testingCity
        }
      }
      const store = testStore(initialState);
      store.dispatch = mockedFunction;
      const wrapper = shallow(<App store={store} />).childAt(0).dive();

      it("Should update city state with anything user entered in SharedTextInput", ()=>{
        const component = wrapper.find(SharedTextInput).dive().find('input[type="text"]');
        const testingMessage = "Any message";
        component.simulate('change', {target:{value: testingMessage}});
        expect(wrapper.state().city).toBe(testingMessage);
      });
      
      it('Should dispatch a setting city action with the city state' +
        ' when user clicks SharedButton', ()=>{
        const component = wrapper.find(SharedButton).dive().find('button');
        const city = wrapper.state().city;
        const expectedAction = actions.setCity(city);
        component.simulate('click');
        expect(mockedFunction).toHaveBeenCalledWith(expectedAction);
      });
    });
  });

  describe('Page rendering integration test', ()=>{
    let wrapper;
    it('Should display the error page when there is an error with fetching data', ()=>{
      const initialState = {
        posts:{
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
        posts:{
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
        posts:{
          payload: examplePayload,
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