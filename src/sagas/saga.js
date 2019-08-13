import { put, takeLatest, call } from 'redux-saga/effects';
import { types } from '../actions/types';
import { actions } from '../actions/actions';
import { fetchData, fetchingError } from './api';

export const fetchingErrorMessage = "There is a problem with fetching data (often due to no internet connection).";

export function* getApiData() {
  yield put({type: types.GET_API_DATA, payload: null});
  try{
    const data = yield call(fetchData);
    if(data===fetchingError) yield put(actions.getErrorMessage(fetchingErrorMessage));
    else yield put(actions.receiveApiData(data));
  }   
  catch(e){
    yield put(actions.getErrorMessage(e.message));
  }
}

function* rootSaga() {
   yield takeLatest(types.FIRE_SAGA, getApiData);
}

export default rootSaga;