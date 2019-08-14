import rootReducer from './reducers/index';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/saga';

export const sagaMiddleware = createSagaMiddleware();
export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
export const runSaga = ()=>{sagaMiddleware.run(rootSaga)}