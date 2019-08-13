import { put, call } from 'redux-saga/effects';
import * as api from './api';
import { getApiData, fetchingErrorMessage } from './saga';
import { types } from '../actions/types';
import { actions } from '../actions/actions';
import { runSaga } from 'redux-saga';
import { cloneableGenerator } from '@redux-saga/testing-utils';

describe('Data fetching flow', ()=>{
    it('Should go through branching steps successfully', ()=>{
        const generator = cloneableGenerator(getApiData)();
        expect(generator.next().value).toEqual(
            put({type: types.GET_API_DATA, payload: null})
        );
        expect(generator.next().value).toEqual(call(api.fetchData));
        //branching saga
        const clone = generator.clone();
        expect(generator.next().value).toEqual(put(actions.receiveApiData(undefined))); 
        expect(clone.next(api.fetchingError).value).toEqual(put(actions.getErrorMessage(fetchingErrorMessage)));
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

describe('Integration test with mockedData', ()=>{
    it('When there is an internet connection, it should dispatch two actions and the second has the mockedData as payload'
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
        //console.log(dispatchedActions);
    });

    it('When there is no internet connection, it should dispatch the fetching error message'
    , async ()=>{
        const dispatchedActions = [];
        const mockedData = api.fetchingError;
        api.fetchData = jest.fn(()=>Promise.resolve(mockedData));
        const fakeStore = {
            dispatch: action => dispatchedActions.push(action)
        };
        const expectedActions = [
            { type: types.GET_API_DATA, payload: null },
            {
              type: types.REQUEST_ERROR,
              error: fetchingErrorMessage
            }
          ];
        await runSaga(fakeStore, getApiData).done;
        expect(dispatchedActions).toEqual(expectedActions);
    });
});