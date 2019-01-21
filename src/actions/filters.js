import types from '../action_types';

export const setTextFilter = (filterText = '') => ({
    type: types.CITY_FILTER_CHANGE,
    text: filterText
});

export const submitFilter = (filterText = '') => ({
    type: types.CITY_FILTER_SUBMIT,
    text: filterText
});

export const clearFilter = () => ({
    type: types.CITY_FILTER_CLEAR
});
