import 'babel-polyfill';
import axios from 'axios';
import moment from 'moment';

import types from '../action_types';
import { getDateLabel } from '../services/common-utils';

const citiesList = [
    {
        title: 'zaragoza',
        country: 'Spain',
        code: 1,
        high: 20,
        low: 7
    },
    {
        title: 'madrid',
        country: 'Spain',
        code: 2,
        high: 17,
        low: 3
    },
    {
        title: 'ronda',
        country: 'Spain',
        code: 3,
        high: 15,
        low: 0
    },
    {
        title: 'glazov',
        country: 'Russia',
        code: 1234,
        high: 0,
        low: -22
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
            const allWeather = [];
            cities.forEach(async (city) => {
                //allWeather.push(genWeather(city, city.high, city.low));
                await axios.post(`/api/weather`, {
                    data: genWeather(city, city.high, city.low)
                });
            });

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


let wd = {
    "city": {
        "id": 3104324,
        "name": "Zaragoza",
        "coord": {
            "lat": 41.6561,
            "lon": -0.8774
        },
        "country": "ES"
    },
    "weekly": [
        {
            "dt": 1548266400,
            "main": {
                "temp": 8.74,
                "temp_min": 8.2,
                "temp_max": 8.74,
                "pressure": 973.49,
                "humidity": 88,
            },
            "weather": [
                {
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "rain_light"
                }
            ],
            "dt_txt": "2019-01-23 18:00:00"
        }
    ]
};

function genWeather(city, high, low) {
    const data = {
        city: {
            __key__: city.__key__,
            title: city.title,
            country: city.country,
            code: city.code
        }
    };
    data.weekly = genWeekly(high, low, city.code);
    console.log(data);
    return data;
}

function genWeekly(high, low, cityCode) {
    let date = moment();
    date.set('hour', 12);
    date.set('minute', 0);
    date.set('second', 0);

    let days = {};
    for(let i = 0; i < 8; i++) {
        // me-he-he ^^
        let weatherIndex = rand(cityCode === 1 ? 4 : 0, weatherTypes.length);
        let day = {
            date_txt: getDateLabel('weekly', date),
            moment: date.format(),
            ts: date.valueOf(),
            main: getTemp(high, low),
            weather: weatherTypes[weatherIndex],
            hourly: genHourly(date, high, low, cityCode)
        };
        days[day.date_txt] = day;
        date.add(1, 'days');
    }
    //console.log(days);
    return days;
}

function genHourly(dayDate, high, low, cityCode) {
    let date = moment(dayDate); // clone
    date.set('hour', 0);
    date.set('minute', 0);
    date.set('second', 0);

    let hours = {};
    for(let i = 0; i < 24; i++) {
        // me-he-he ^^
        let weatherIndex = rand(cityCode === 1 ? 4 : 0, weatherTypes.length);
        let hour = {
            date_txt: getDateLabel('hourly', date),
            moment: date.format(),
            ts: date.valueOf(),
            main: getTemp(high, low),
            weather: weatherTypes[weatherIndex]
        };
        hours[hour.date_txt] = hour;
        date.add(1, 'hours');
    }
    //console.log(days);
    return hours;
}

function getTemp(high, low) {
    let temp1 = rand(low, high);
    let temp2 = rand(low, high);
    return {
        'temp': (Math.min(temp1, temp2) + Math.max(temp1, temp2))/2, // Science!
        'temp_min': Math.min(temp1, temp2),
        'temp_max': Math.max(temp1, temp2),
        'pressure': rand(700, 1200),
        'humidity': rand(50, 100)
    };
}

// max is not included
function rand(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

const weatherTypes = [
    {
        main: 'Heavy rain',
        description: 'heavy rain',
        icon: 'heavy_rain' // map to some base64
    },
    {
        main: 'Rain',
        description: 'rain',
        icon: 'rain'
    },
    {
        main: 'Light rain',
        description: 'light rain',
        icon: 'light_rain'
    },
    {
        main: 'Cloudy',
        description: 'cloudy',
        icon: 'cloudy'
    },
    {
        main: 'Partly cloudy',
        description: 'partly cloudy',
        icon: 'partly_cloudy'
    },
    {
        main: 'Sunny',
        description: 'sunny',
        icon: 'sunny'
    }
];