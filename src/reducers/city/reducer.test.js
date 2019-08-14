import { actions } from '../../actions/actions';
import cityReducer, { initState } from './reducer';

describe('City Reducer', () => {
    const state = initState;
    it('Should return default state', () => {
        const newState = cityReducer(null, {});
        expect(newState).toEqual(state);
    });

    it('Should return a new state if type is SET_CITY', () => {
        const testingCity = "Sydney";
        const newState = cityReducer(state, actions.setCity(testingCity));
        expect(newState).toEqual({...state, city: testingCity});
    });
});