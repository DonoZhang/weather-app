import { types } from '../../actions/types';
import postsReducer from './reducer';

describe('Posts Reducer', () => {
    const state = {};
    it('Should return default state', () => {
        const newState = postsReducer(null, {});
        expect(newState).toEqual(state);
    });

    it('Should return loading = true if type is GET_API_DATA', () => {
        const newState = postsReducer(state, {
            type: types.GET_API_DATA,
            payload: "anything"
        });
        expect(newState).toEqual({...state, loading: true, error: ''});
    });

    it('Should return new state and loading = false if type is API_DATA_RECEIVED', () => {
        const payload = {json: 'a json file'};
        const newState = postsReducer({}, {
            type: types.API_DATA_RECEIVED,
            payload: payload
        });
        expect(newState).toEqual({...state, payload: payload, loading: false, error: ''});
    });

    it('Should return loading = false and an error message if type is REQUEST_ERROR', () => {
        const newState = postsReducer(state , {
            type: types.REQUEST_ERROR,
            error: "an error"
        });
        expect(newState).toEqual({...state, loading: false, error: "an error"});
    });

});