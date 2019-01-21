import types from '../action_types';

export const doSelectCity = (cityId = '') => ({
    type: types.CITY_SELECTOR_PICK,
    value: cityId
});

export const selectCity = (cityId = '') => {
    return (dispatch) => {
        setTimeout(() => {
            return dispatch(doSelectCity(cityId));
        }, 2000)
    }
}