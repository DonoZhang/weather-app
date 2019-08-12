import { actions } from './actions';
import { types } from './types';

describe('Actions generator', ()=>{
    it('Should return action to fire saga', ()=>{
        const actionExpected = {
            type: types.FIRE_SAGA
        };
        const action = actions.fireSaga();
        expect(action).toStrictEqual(actionExpected);
    });

    it('Should return a get api data action', ()=>{
        const actionExpected = {
            type: types.GET_API_DATA,
            payload: undefined
        };
        const action = actions.requestApiData();
        expect(action).toStrictEqual(actionExpected);
    });

    it('Should return a receive api data action', ()=>{
        const data = {testData: "test data"};
        const actionExpected = {
            type: types.API_DATA_RECEIVED,
            payload: data
        };
        const action = actions.receiveApiData(data);
        expect(action).toStrictEqual(actionExpected);
    });

    it('Should return a error message action', ()=>{
        const error = "error message";
        const actionExpected = {
            type: types.REQUEST_ERROR,
            error: error
        };
        const action = actions.getErrorMessage(error);
        expect(action).toStrictEqual(actionExpected);
    });
});