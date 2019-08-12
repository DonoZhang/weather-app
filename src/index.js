import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store, runSaga } from './createStore';
import App from './containers/App/index';
import './index.scss';

runSaga();
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
