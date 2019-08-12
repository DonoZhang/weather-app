import { put, call } from 'redux-saga/effects';
import * as api from './api';
import { getApiData } from './saga';
import { types } from '../actions/types';
import { actions } from '../actions/actions';
import { runSaga } from 'redux-saga';

describe('Data fetching flow', ()=>{
    it('Should fetch data successfully', ()=>{
        const generator = getApiData();
        expect(generator.next().value).toEqual(
            put({type: types.GET_API_DATA, payload: null})
        );
        expect(generator.next().value).toEqual(call(api.fetchData));
        expect(generator.next().value).toEqual(put(actions.receiveApiData(undefined))); 
    });

    it('Should handle exception as expected', ()=>{
        const generator = getApiData();
        expect(generator.next().value).toEqual(
            put({type: types.GET_API_DATA, payload: null})
        );
        expect(generator.next().value).toEqual(call(api.fetchData));
        expect(generator.throw('an error').value).toEqual(
            put(actions.getErrorMessage(undefined))
        );
    });
});

describe('Data fetching with mockedData', ()=>{
    it('Should dispatch two actions and the second has the mockedData as payload'
    , async ()=>{
        const dispatchedActions = [];
        const mockedData = {title: 'I am a JSON file', format: 'JSON'};
        api.fetchData = jest.fn(()=>Promise.resolve(mockedData));
        const fakeStore = {
            dispatch: action => dispatchedActions.push(action)
        };
        const expectedActions = [
            { type: types.GET_API_DATA, payload: null },
            {
              type: types.API_DATA_RECEIVED,
              payload: mockedData
            }
          ];
        await runSaga(fakeStore, getApiData).done;
        expect(dispatchedActions).toEqual(expectedActions);
        console.log(dispatchedActions);
    });
});