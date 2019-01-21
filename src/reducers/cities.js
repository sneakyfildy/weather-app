import uuid from 'uuid';

import types from '../action_types';
// // Don't know how this data is going to be really used, so putting
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
        default:
            return state;
    }
};
