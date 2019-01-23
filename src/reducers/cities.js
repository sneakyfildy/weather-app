//import uuid from 'uuid';

import types from '../action_types';
import selectCities from '../selectors/cities';
// Don't know how this data is going to be really used, so putting
// hardcoded set of cities here at the moment
const citiesReducerDefaultState = {
    items: [
    ],
    selectedItem: {}
};

export default (state = citiesReducerDefaultState, action) => {
    switch (action.type) {
        case types.CITY_SELECTOR_PICK:
            return {
                ...state,
                selectedItem: {
                    title: action.cityTitle
                }
            };
        case types.CITY_FILTER_SUBMIT:
            if (!!action.value) {
                const matchingItems = selectCities(state.items, {text: action.value});
                return {
                    ...state,
                    selectedItem: matchingItems[0] || {}

                };
            } else return state;
        case types.CITIES_RECEIVED:
            return {
                items: action.cities.slice(),
                selectedItem: state.selectedItem
            };
        default:
            return state;
    }
};
