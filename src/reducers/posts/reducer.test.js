import { actions } from '../../actions/actions';
import postsReducer from './reducer';

describe('Posts Reducer', () => {
    const state = {};
    it('Should return default state', () => {
        const newState = postsReducer(null, {});
        expect(newState).toEqual(state);
    });

    it('Should return loading = true if type is GET_API_DATA', () => {
        const newState = postsReducer(state, actions.requestApiData());
        expect(newState).toEqual({...state, loading: true, error: ''});
    });

    it('Should return new state and loading = false if type is API_DATA_RECEIVED', () => {
        const payload = {json: 'a json file'};
        const newState = postsReducer({}, actions.receiveApiData(payload));
        expect(newState).toEqual({...state, payload, loading: false, error: ''});
    });

    it('Should return loading = false and an error message if type is REQUEST_ERROR', () => {
        const error = "an error";
        const newState = postsReducer(state , actions.getErrorMessage(error));
        expect(newState).toEqual({...state, loading: false, error});
    });

});