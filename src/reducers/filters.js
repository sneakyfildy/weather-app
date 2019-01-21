import types from '../action_types';

const cityFilterDefaultState = {
    text: ''
};

export default (state = cityFilterDefaultState, action) => {
    switch (action.type) {
        case types.SET_CITY_TEXT_FILTER:
            return {
                ...state,
                text: action.text
            };
        default:
            return state;
    }
};
