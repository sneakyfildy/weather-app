import types from '../action_types';

export const selectCity = (cityId = '') => ({
    type: types.CITY_SELECTOR_PICK,
    value: cityId
});