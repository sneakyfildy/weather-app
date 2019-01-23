import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
//
import { getCities } from '../actions/db';
import { getCityWeather } from '../actions/weather';
import { doSelectCity } from '../actions/citySelector';

import WeeklyWeather from './WeeklyWeather';

export class CityPage extends React.Component {
    constructor(props) {
        super(props);

    }
    componentDidMount() {
        let { city } = this.props.match.params;
        let haveDataAlready = false;
        if (this.props.weather.city
            && this.props.weather.city.title.toLowerCase() === city.toLowerCase())
        {
            haveDataAlready = true;
        }

        if (!haveDataAlready && !!city) {
            this.props.dispatch(doSelectCity(city));
            this.props.dispatch(getCityWeather(city));
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.match.params.city !== prevProps.match.params.city) {
            this.updateWeather();
        }
    }
    componentWillUnmount() {
    }
    updateWeather() {
        let { city } = this.props.match.params;
        if (!!city) {
            this.props.dispatch(getCityWeather(city));
        }
    }
    render() {
        return (
            <div>
                abstract
            </div>
        );
    }
}


export default CityPage;