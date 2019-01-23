import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import moment from 'moment';

import NoDataSorry from './NoDataSorry';
import selectCities from '../selectors/cities';
import { selectCity } from '../actions/citySelector';

import { capitalize, getDateLabel } from '../services/common-utils';
import * as _ from 'lodash';

export class WeeklyWeather extends React.Component {
    onWeatherItemClick(dateLabel) {
        this.props.history.push(`/${this.props.match.params.city}/${dateLabel}`);
    }

    componentWillMount() {
        this.updateNextWeekDates();
    }

    updateNextWeekDates () {
        this.nextWeek = [];
        let date = moment(); // today
        date.set('hour', 12);
        date.set('minute', 0);
        date.set('second', 0);
        for(let i = 0; i < 8; i++) {
            this.nextWeek.push(getDateLabel('weekly', date));
            date.add(1, 'days');
        }
        // we want to have an array with date strings [yyyy-mm-dd, ...]
        // to later iterate over them and search for according weather data
        // this allows to download more (or less) weather data and rended only
        // those pieces which are needed and downloaded
    }

    renderWeeklyData() {
        this.updateNextWeekDates();
        return this.nextWeek.map((dateLabel) => {
            const weatherData = this.props.weather.weekly[dateLabel];
            if (weatherData) {
                let momentData = moment(weatherData.moment);
                // todo: imporve as stateless functional (or even a regular) cmp
                return (
                    <div
                        key={weatherData.date_txt}
                        className="weather-panel-item weekly clickable"
                        onClick={() => {this.onWeatherItemClick(weatherData.date_txt)}}
                        >
                            <div className="date-info">{momentData.format("ddd, MMM Do")}</div>
                            <div>max: {weatherData.main.temp_max}</div>
                            <div>min: {weatherData.main.temp_min}</div>
                            <div className="weather-description">{weatherData.weather.main}</div>
                    </div>
                );
            }
        });
    }

    renderNoData() {
        this.updateNextWeekDates();
        return this.nextWeek.map((dateLabel) => {
            const weatherData = this.props.weather.weekly[dateLabel];
            if (weatherData) {
                let momentData = moment(weatherData.moment);
                // todo: imporve as stateless functional (or even a regular) cmp
                return (
                    <div
                        key={weatherData.date_txt}
                        className="weather-panel-item weekly clickable"
                        onClick={() => {this.onWeatherItemClick(weatherData.date_txt)}}
                        >
                            <div className="date-info">{momentData.format("ddd, MMM Do")}</div>
                            <div>max: {weatherData.main.temp_max}</div>
                            <div>min: {weatherData.main.temp_min}</div>
                            <div className="weather-description">{weatherData.weather.main}</div>
                    </div>
                );
            }
        });
    }

    render() {
        return (
            <div className="weekly-weather-component">
            <div className="component-caption">Next week</div>
            {this.props.weather.isLoading &&
                <span className="loading-mask">Weather is loading...</span>}
            {!!this.props.weather.weekly &&
                <div className="weather-panel">{this.renderWeeklyData()}</div>}
            {!this.props.weather.weekly && !this.props.weather.isLoading &&
                <NoDataSorry section="location"/>}
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        selectedCity: state.cities.selectedItem,
        weather: state.weather
    };
};


export default withRouter(connect(mapStateToProps)(WeeklyWeather));