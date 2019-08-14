import { put, takeLatest, call } from 'redux-saga/effects';
import { types } from '../actions/types';
import { actions } from '../actions/actions';
import { fetchData, fetchingError, cityError, unknownError } from './api';
import { store } from '../createStore';

export const fetchingErrorMessage = "There is a problem with fetching data, please check your internet connection.";
export const cityErrorMessage = "Sorry, we cannot find the town you are looking for :(";
export const unknownErrorMessage = "Sorry, unknown error happened";

export function* getApiData() {
  const city = store.getState().city.city;
  yield put({type: types.GET_API_DATA, payload: null});
  try{
    const data = yield call(fetchData, city);
    switch(data){
      case fetchingError:{
        yield put(actions.getErrorMessage(fetchingErrorMessage));
        break;
      }
      case cityError:{
        yield put(actions.getErrorMessage(cityErrorMessage));
        break;
      }
      case unknownError:{
        yield put(actions.getErrorMessage(unknownErrorMessage));
        break;
      }
      default:{
        yield put(actions.receiveApiData(data));
      }
    }
  }   
  catch(e){
    yield put(actions.getErrorMessage(e.message));
  }
}

function* rootSaga() {
   yield takeLatest(types.FIRE_SAGA, getApiData);
}

export default rootSaga;