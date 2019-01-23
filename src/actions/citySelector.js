import types from '../action_types';
import MemoryLS from '../services/MemoryLS';
import { createBrowserHistory  } from 'history'
const history = createBrowserHistory();


export const doSelectCity = (cityId = '') => ({
    type: types.CITY_SELECTOR_PICK,
    value: cityId
});

export const selectCity = (cityId = '', cityTitle = '') => {
    return (dispatch) => {
        if (cityTitle) {
            // https://github.com/ReactTraining/react-router/issues/4179
            history.push(`/${cityTitle.toLowerCase()}`);
            MemoryLS.saveLastCity(cityId, cityTitle);
            return dispatch(doSelectCity(cityId));
        } else {
            throw new Error('No city title for selectCity action');
        }
    };
};