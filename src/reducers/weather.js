//import { capitalize } from '../services/common-utils';
import types from '../action_types';
const weatherDefaultState = {
    city: null,
    weekly: null,
    isLoading: false
};

export default (state = weatherDefaultState, action) => {
    switch (action.type) {
        case types.WEATHER_RECEIVED:
            return {
                city: action.weatherData.city,
                weekly: action.weatherData.weekly,
                isLoading: false
            };
        case types.WEATHER_IS_LOADING:
            return {
                ...state,
                isLoading: !!action.value
            };
        default:
            return state;
    }
};
