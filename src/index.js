import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import gameReduc from './reducers'

// import { mixCards } from './actions';

let store = createStore(gameReduc);
// store.dispatch(mixCards());
// store.dispatch();

const root = document.querySelector('#root');
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , root
);
registerServiceWorker();
