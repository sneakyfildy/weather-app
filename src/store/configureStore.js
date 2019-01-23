import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import citiesReducer from '../reducers/cities';
import filtersReducer from '../reducers/filters';
import weatherReducer from '../reducers/weather';

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