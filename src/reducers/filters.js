import { capitalize } from '../services/common-utils';
import types from '../action_types';
const cityFilterDefaultState = {
    text: ''
};

export default (state = cityFilterDefaultState, action) => {
    switch (action.type) {
        case types.CITY_FILTER_CHANGE:
            return {
                ...state,
                text: action.text
            };

        case types.CITY_FILTER_CLEAR:
            return {
                ...state,
                text: ''
            };
        case types.CITY_SELECTOR_PICK:
            // todo: may be fired by another action
            return {
                ...state,
                text: capitalize(action.cityTitle)
            };
        default:
            return state;
    }
};
