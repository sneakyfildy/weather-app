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
        case types.CITY_FILTER_SUBMIT:
            return {
                ...state,
                text: action.text
            };
        case types.CITY_FILTER_CLEAR:
            return {
                ...state,
                text: ''
            };
        default:
            return state;
    }
};
