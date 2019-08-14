import { types } from '../../actions/types';

export const initState = {city: "Melbourne"};

export default (state, action) => {
    if(!state) return initState;
    switch(action.type){
        case types.SET_CITY:
            return {...state, city: action.city};
        default:
            return state;
    }
};