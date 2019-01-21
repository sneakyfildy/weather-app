import types from '../action_types';

export const setTextFilter = (text = '') => ({
    type: types.SET_CITY_TEXT_FILTER,
    text
});
