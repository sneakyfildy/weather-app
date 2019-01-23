import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import citiesReducer from '../reducers/cities';
import filtersReducer from '../reducers/filters';
import weatherReducer from '../reducers/weather';

console.error('sort this out: __REDUX_DEVTOOLS_EXTENSION__');

export default () => {
    const store = createStore(
        combineReducers({
            cities: citiesReducer,
            filters: filtersReducer,
            weather: weatherReducer
        }),
        applyMiddleware(thunkMiddleware)
    );

    return store;
};