import * as _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import moment from 'moment';

import NoDataSorry from './NoDataSorry';
import selectCities from '../selectors/cities';
import { selectCity } from '../actions/citySelector';

import { capitalize, getDateLabel, imgMap } from '../services/common-utils';

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
        const pageDateLabel = this.props.match.params.dateLabel;
        this.updateNextWeekDates();
        return this.nextWeek.map((dateLabel) => {
            const weatherData = this.props.weather.weekly[dateLabel];
            if (weatherData) {
                let momentData = moment(weatherData.moment);
                let className = "weather-panel-item weekly clickable ";
                className += weatherData.date_txt === pageDateLabel ? 'active' : '';
                // todo: imporve as stateless functional (or even a regular) cmp
                return (
                    <div
                        key={weatherData.date_txt}
                        className={className}
                        onClick={() => {this.onWeatherItemClick(weatherData.date_txt)}}
                        >
                            <div className="date-info">
                                {momentData.format("ddd, MMM Do")}
                            </div>
                            <div className="weather-description">{weatherData.weather.main}</div>
                            <div className="temperatures">
                                <div className="high">
                                    {weatherData.main.temp_max}
                                </div>
                                <div className="low">
                                    {weatherData.main.temp_min}
                                </div>
                            </div>
                            <img className="icon" src={imgMap[weatherData.weather.icon]}/>
                    </div>
                );
            }
        });
    }

    render() {
        return (
            <div className="weekly-weather-component">
            {this.props.weather.isLoading &&
                <span className="loading-mask">Weather is loading...</span>}
            {!!this.props.weather.weekly &&
                (
                <div>
                    <div className="component-caption">Next week</div>
                    <div className="weather-panel weekly">
                        {this.renderWeeklyData()}
                    </div>
                </div>
                )
            }
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