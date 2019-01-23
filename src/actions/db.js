import "babel-polyfill";

import types from '../action_types';
import axios from 'axios';

const citiesList = [
    {
        title: 'Zaragoza',
        country: 'Spain',
        code: 1
    },
    {
        title: 'Madrid',
        country: 'Spain',
        code: 2
    },
    {
        title: 'Ronda',
        country: 'Spain',
        code: 3
    },
    {
        title: 'Glazov',
        country: 'Russia',
        code: 1234
    }
];

export const clearedDb = () => ({
    type: types.DB_CLEARED
});

export const gotCities = (cities) => ({
    type: types.CITIES_RECEIVED,
    cities: cities
});

export const clearDb = (apiName) => {
    return (dispatch) => {
        axios.delete(`/api/${apiName}`)
        .then(function (response) {
            console.log('DB cleared', response);
            dispatch(getCities());
        })
        .catch(function (error) {
            console.log('DB failed to be cleared', error);
        });
    };
};

// this action will try to fill data bases with predefined cities and will try
// to generate a random weather data for them
export const fillDbs = (apiName) => {
    return async (dispatch) => {
        try {
            await axios.delete(`/api/weather`);
            console.log('weather DB cleared');
            await axios.delete(`/api/cities`);
            console.log('citiesDB cleared');

            await fillCities();
            const cities = (await axios.get(`/api/cities`)).data.data;
            dispatch(gotCities(cities));

        }catch (err) {
            console.log('DB failed to be cleared', err);
        }
    };
};

function fillCities() {
    return axios.post(`/api/cities`, {
        data: citiesList
    });
}


export const getCities = () => {
    return async (dispatch) => {
        try {
            const cities = (await axios.get(`/api/cities`)).data.data;
            dispatch(gotCities(cities));
        }catch (err) {
            console.log('Failed to fetch cities', err);
        }
    };
};