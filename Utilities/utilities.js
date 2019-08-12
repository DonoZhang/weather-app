import checkPropTypes from 'check-prop-types';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from '../src/reducers/index';
import { sagaMiddleware } from './../src/createStore';

export const findByTestAttr = (component, attr)=>{
    const wrapper = component.find(`[data-test='${attr}']`);
    return wrapper;
};

export const checkProps = (component, expectedProps) => {
    const propsErr = checkPropTypes(component.propTypes, expectedProps, component);
    return propsErr;
};

export const testStore = (initialState) => {
    const createStoreWithMiddleware = applyMiddleware(sagaMiddleware)(createStore);
    return createStoreWithMiddleware(rootReducer, initialState);
};

export function offsetToTime(offset){
    var current = new Date();
    var utc = new Date(
        current.getUTCFullYear(),
        current.getUTCMonth(),
        current.getUTCDate(),
        current.getUTCHours(),
        current.getUTCMinutes(), 
        current.getUTCSeconds()
      ).getTime();
    var locale = utc + offset*1000;
    var d = new Date(locale);
    var h = d.getHours();
    var m = d.getMinutes()<10?`0${d.getMinutes()}`:d.getMinutes();
    return `${h}:${m}`;
}