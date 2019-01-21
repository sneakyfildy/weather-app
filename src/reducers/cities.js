import uuid from 'uuid';

import types from '../action_types';
import selectCities from '../selectors/cities';
// Don't know how this data is going to be really used, so putting
// hardcoded set of cities here at the moment
const citiesReducerDefaultState = {
    items: [
        {
            id: uuid(),
            title: 'azazaz'
        },
        {
            id: uuid(),
            title: 'ololo'
        },
        {
            id: uuid(),
            title: 'zlo'
        }
    ],
    selectedId: null,
    selectedItem: null
};

export default (state = citiesReducerDefaultState, action) => {
    switch (action.type) {
        case types.CITY_SELECTOR_PICK:
            return {
                ...state,
                selectedId: action.value,
                selectedItem: state.items.filter((item) => item.id === action.value)[0]
            };
        case types.CITY_FILTER_SUBMIT:
            if (!!action.value) {
                const matchingItems = selectCities(state.items, {text: action.value});
                return {
                    ...state,
                    selectedId: matchingItems[0] && matchingItems[0].id || null,
                    selectedItem: matchingItems[0] || null

                };
            } else return state
        default:
            return state;
    }
};
