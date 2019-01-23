import React from 'react';
import ReactDOM from 'react-dom';
//
import './styles/base.scss';
//
import AppRouter from './routers/AppRouter';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

const store = configureStore();

const appTpl = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(appTpl, window.document.getElementById('app'));