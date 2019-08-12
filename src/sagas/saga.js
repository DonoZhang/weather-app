import { put, takeLatest, call } from 'redux-saga/effects';
import { types } from '../actions/types';
import { actions } from '../actions/actions';
import { fetchData } from './api';

export function* getApiData() {
  yield put({type: types.GET_API_DATA, payload: null});
  try{
    const data = yield call(fetchData);
    yield put(actions.receiveApiData(data));
  }   
  catch(e){
    yield put(actions.getErrorMessage(e.message));
  }
}

function* rootSaga() {
   yield takeLatest(types.FIRE_SAGA, getApiData);
}

export default rootSaga;