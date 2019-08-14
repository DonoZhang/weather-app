import { combineReducers } from 'redux';
import posts from './posts/reducer';
import city from './city/reducer';

export default combineReducers({
    posts,
    city
});