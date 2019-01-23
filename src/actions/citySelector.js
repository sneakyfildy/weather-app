import types from '../action_types';
import MemoryLS from '../services/MemoryLS';
//import { createBrowserHistory  } from 'history'
//const history = createBrowserHistory();

export const doSelectCity = (cityTitle = '') => ({
    type: types.CITY_SELECTOR_PICK,
    cityTitle
});

export const selectCity = (cityTitle = '') => {
    return (dispatch) => {
        if (cityTitle) {
            // (does not work, does not run componentDidUpdate)
            // https://github.com/ReactTraining/react-router/issues/4179
            //history.push(`/${cityTitle.toLowerCase()}`);

            MemoryLS.saveLastCity(cityTitle);
            return dispatch(doSelectCity(cityTitle));
        } else {
            throw new Error('No city title for selectCity action');
        }
    };
};