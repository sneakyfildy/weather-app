import React from 'react';
import ReactDOM from 'react-dom';
import WeatherApp from './components/WeatherApp';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

const store = configureStore();

const appTpl = (
  <Provider store={store}>
    <WeatherApp />
  </Provider>
);

ReactDOM.render(appTpl, document.getElementById('app'));