import { createStore, combineReducers } from 'redux';
import citiesReducer from '../reducers/cities';
import filtersReducer from '../reducers/filters';

console.error('sort this out: __REDUX_DEVTOOLS_EXTENSION__');

export default () => {
    const store = createStore(
        combineReducers({
            cities: citiesReducer,
            filters: filtersReducer
        })
    );

    return store;
};