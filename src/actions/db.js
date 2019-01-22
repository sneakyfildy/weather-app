import types from '../action_types';
import axios from 'axios';

export const clearedDb = () => ({
    type: types.DB_CLEARED
});

export const clearDb = (cityId = '') => {
    return (dispatch) => {
        axios.delete('/api/weather')
        .then(function (response) {
            console.log('DB cleared', response);
            dispatch(clearedDb());
        })
        .catch(function (error) {
            console.log('DB failed to be cleared', error);
        });
    };
};