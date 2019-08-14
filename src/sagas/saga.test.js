import { put, call } from 'redux-saga/effects';
import * as api from './api';
import * as saga from './saga';
import { types } from '../actions/types';
import { actions } from '../actions/actions';
import { runSaga } from 'redux-saga';
import { cloneableGenerator } from '@redux-saga/testing-utils';

describe('Data fetching flow', ()=>{
    const city = "test city";
    it('Should go through branching steps successfully', ()=>{
        const generator = cloneableGenerator(saga.getApiData)(city);
        expect(generator.next().value).toEqual(
            put({type: types.GET_API_DATA, payload: null})
        );
        expect(generator.next().value).toEqual(call(api.fetchData, city));
        //branching saga
        const clone_fetchingError = generator.clone();
        const clone_cityError = generator.clone();
        const clone_unknownError = generator.clone();
        //when api returns a fetching error
        expect(clone_fetchingError.next(api.fetchingError).value).toEqual(put(actions.getErrorMessage(saga.fetchingErrorMessage)));
        //when api returns a city error
        expect(clone_cityError.next(api.cityError).value).toEqual(put(actions.getErrorMessage(saga.cityErrorMessage)));
        //when api returns an unknown error
        expect(clone_unknownError.next(api.unknownError).value).toEqual(put(actions.getErrorMessage(saga.unknownErrorMessage)));
        //when api returns data without error
        expect(generator.next().value).toEqual(put(actions.receiveApiData(undefined))); 
        
    });

    it('Should handle exception as expected (try-catch test)', ()=>{
        const generator = saga.getApiData(city);
        expect(generator.next().value).toEqual(
            put({type: types.GET_API_DATA, payload: null})
        );
        expect(generator.next().value).toEqual(call(api.fetchData, city));
        expect(generator.throw('an error').value).toEqual(
            put(actions.getErrorMessage(undefined))
        );
    });
});

describe('Integration test with mockedData', ()=>{
    describe('Function test', ()=>{
        it('When everything works, it should dispatch two actions and the second has the mockedData as payload'
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
            await runSaga(fakeStore, saga.getApiData).done;
            expect(dispatchedActions).toEqual(expectedActions);
            //console.log(dispatchedActions);
        });
    });

    describe('Exception handling test', ()=>{
        it('When there is no internet connection, it should dispatch fetchingErrorMessage'
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
                error: saga.fetchingErrorMessage
                }
            ];
            await runSaga(fakeStore, saga.getApiData).done;
            expect(dispatchedActions).toEqual(expectedActions);
        });

        it('When api cannot find a city, it should dispatch cityErrorMessage'
        , async ()=>{
            const dispatchedActions = [];
            const mockedData = api.cityError;
            api.fetchData = jest.fn(()=>Promise.resolve(mockedData));
            const fakeStore = {
                dispatch: action => dispatchedActions.push(action)
            };
            const expectedActions = [
                { type: types.GET_API_DATA, payload: null },
                {
                type: types.REQUEST_ERROR,
                error: saga.cityErrorMessage
                }
            ];
            await runSaga(fakeStore, saga.getApiData).done;
            expect(dispatchedActions).toEqual(expectedActions);
        });

        it('When there is an unclear error of the api fetching data, it should dispatch unknownErrorMessage'
        , async ()=>{
            const dispatchedActions = [];
            const mockedData = api.unknownError;
            api.fetchData = jest.fn(()=>Promise.resolve(mockedData));
            const fakeStore = {
                dispatch: action => dispatchedActions.push(action)
            };
            const expectedActions = [
                { type: types.GET_API_DATA, payload: null },
                {
                type: types.REQUEST_ERROR,
                error: saga.unknownErrorMessage
                }
            ];
            await runSaga(fakeStore, saga.getApiData).done;
            expect(dispatchedActions).toEqual(expectedActions);
        });
    });
});