import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import moment from 'moment';

import NoDataSorry from './NoDataSorry';
import selectCities from '../selectors/cities';
import { selectCity } from '../actions/citySelector';

import { capitalize, getDateLabel, imgMap } from '../services/common-utils';
import * as _ from 'lodash';

export class HourlyWeather extends React.Component {

    onWeatherItemClick(dateLabel) {
        // removing trailing slash if any
        let pathname = this.props.location.pathname.replace(/\/$/, '');
        this.props.history.push(`${pathname}/${dateLabel}`);
    }

    componentWillMount() {
        this.updateDayHours();
    }

    updateDayHours () {
        let dataLabel;
        try {
            dataLabel = this.props.match.params.dateLabel;
        } catch (err) {
            // not all data is ready
            return;
        }

        this.dayHours = [];
        let date = moment(dataLabel); // date from URL
        const today = moment();
        const isToday = date.isSame(today, 'day');
        let stop = false;
        date.set('hour', isToday ? today.get('hour') : 0);
        date.set('minute', 0);
        date.set('second', 0);
        const initialDate = moment(date); // clone

        for(let i = date.get('hour'); date.isSame(initialDate, 'day'); i++) {
            this.dayHours.push({
                hour: date.get('hour'),
                dateLabel: getDateLabel('hourly', date)
            });
            date.add(1, 'hours');
        }
    }

    renderHourlyData() {
        if (!this.props.weather.weekly[this.props.match.params.dateLabel]) {
            return (
                <NoDataSorry section="location or date... or both"/>
            );
        }
        this.updateDayHours();
        const dataset = this.props.weather.weekly[this.props.match.params.dateLabel].hourly;
        return this.dayHours.map((hourlyData) => {
            const weatherData = dataset[hourlyData.dateLabel];
            if (weatherData) {
                let momentData = moment(weatherData.moment);
                // todo: imporve as stateless functional (or even a regular) cmp
                return (
                    <div
                        key={weatherData.date_txt}
                        className="weather-panel-item hourly"
                        >
                            <div className="weather-description">
                                {weatherData.weather.main}
                            </div>

                            <div className="date-info">{momentData.format("HH:mm")}</div>

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
            <div className="component-caption">Hourly forecast</div>
            {this.props.weather.isLoading &&
                <span className="loading-mask">Weather is loading...</span>}
            {!!this.props.weather.weekly &&
                <div className="weather-panel hourly">
                    {this.renderHourlyData()}
                </div>}
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

export default withRouter(connect(mapStateToProps)(HourlyWeather));