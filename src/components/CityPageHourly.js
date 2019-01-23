import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
//
import { getCities } from '../actions/db';
import { getCityWeather } from '../actions/weather';
import { doSelectCity } from '../actions/citySelector';

import WeeklyWeather from './WeeklyWeather';
import HourlyWeather from './HourlyWeather';
import CityPage from './CityPage';

export class CityPageHourly extends CityPage {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <WeeklyWeather />
                <HourlyWeather />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        weather: state.weather
    };
};

export default withRouter(connect(mapStateToProps)(CityPageHourly));