import axios from 'axios';
//import moment from 'moment';
import types from '../action_types';

export const gotCityWeather = (weatherData = []) => ({
    type: types.WEATHER_RECEIVED,
    weatherData
});

export const setCityWeatherLoading = (value = void 0) => ({
    type: types.WEATHER_IS_LOADING,
    value
});
export const getCityWeather = (cityTitle) => {
    // intentionally not using async/await just to show that it is possible
    return (dispatch) => {
        dispatch(setCityWeatherLoading(true));
        axios.get(`/api/weather`, {
            params: {
                child: 'city_title',
                search_string: cityTitle
            }
        }).then((res) => {
            dispatch(gotCityWeather(res.data.data[0]));
        }).catch((err) => {
            dispatch(setCityWeatherLoading(false));
            console.log('Failed to fetch cities', err);
        });
    };
};
