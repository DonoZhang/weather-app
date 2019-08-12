import checkPropTypes from 'check-prop-types';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from '../src/reducers/index';
import { sagaMiddleware } from './../src/createStore';

export const findByTestAttr = (component, attr)=>{
    const wrapper = component.find(`[data-test='${attr}']`);
    return wrapper;
};

export const checkProps = (component, testingProps) => {
    const propsErr = checkPropTypes(component.propTypes, testingProps, component);
    return propsErr;
};

export const testStore = (initialState) => {
    const createStoreWithMiddleware = applyMiddleware(sagaMiddleware)(createStore);
    return createStoreWithMiddleware(rootReducer, initialState);
};