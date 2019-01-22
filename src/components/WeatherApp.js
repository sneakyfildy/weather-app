import '../styles/base.scss';
import axios from 'axios';
import React from 'react';
import CitySelector from './CitySelector';
import CityList from './CityList';
import DebugControls from './DebugControls';

export default class WeatherApp extends React.Component {
    constructor(props) {
        super(props);
        this.title = 'Weather test';
        this.state = {
        };
    }
    componentDidMount() {
        axios.post('/api/weather', {
            firstName: 'Fred',
            lastName: 'Flintstone'
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    componentDidUpdate(prevProps, prevState) {
    }
    componentWillUnmount() {
    }
    render() {

        return (
            <div>
                <h2>{this.title}</h2>
                <DebugControls />
                <CitySelector />
                <CityList />
            </div>
            );
    }
}