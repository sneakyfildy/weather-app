import '../styles/base.scss';
import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { getCities } from '../actions/db';

export class WeatherApp extends React.Component {
    constructor(props) {
        super(props);
        this.title = 'Weather test';
        this.state = {
        };
    }
    componentDidMount() {
        this.props.dispatch(getCities());
    }
    componentDidUpdate(prevProps, prevState) {
    }
    componentWillUnmount() {
    }
    render() {
        return (
            <div>
                <h2>loloshecki</h2>
            </div>
        );
    }
}

export default connect()(WeatherApp)