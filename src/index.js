import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import dataService from './services/dataService'
import gameReduc from './reducers'

// import { mixCards } from './actions';

let store = createStore(gameReduc, applyMiddleware(dataService));
// store.dispatch(mixCards());
// store.dispatch();
store.dispatch({ type: 'GET_CRD_DATA' });

const root = document.querySelector('#root');
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , root
);
registerServiceWorker();

