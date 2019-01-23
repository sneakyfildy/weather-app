import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
//
import { getCities } from '../actions/db';
import { getCityWeather } from '../actions/weather';
import { doSelectCity } from '../actions/citySelector';

import WeeklyWeather from './WeeklyWeather';
import CityPage from './CityPage';

export class CityPageWeekly extends CityPage {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {/* city page: {this.props.match.params.city} */}
                <WeeklyWeather />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        weather: state.weather
    };
};

export default withRouter(connect(mapStateToProps)(CityPageWeekly))