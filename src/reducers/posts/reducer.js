import { types } from '../../actions/types';

const initState = {};

export default (state, action) => {
    if(!state) return initState;
    switch(action.type){
        case types.GET_API_DATA:
            return {...state, loading: true, error: ''};
        case types.API_DATA_RECEIVED:
            return {...state, payload: action.payload, loading: false, error: ''};
        case types.REQUEST_ERROR:
            return {...state, loading: false, error: action.error};
        default:
            return state;
    }
};