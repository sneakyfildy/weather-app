import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
//
import { getCities } from '../actions/db';
import Globals from '../globals/Globals';
import MemoryLS from '../services/MemoryLS';

export class StartPage extends React.Component {
    constructor(props) {
        super(props);
        this.title = 'Weather test';
        this.state = {
        };
    }
    componentDidMount() {
        try {
            const detectedCity = Globals.get('city');
            const storedLastCity = MemoryLS.getLastCity().title;
            if (storedLastCity || detectedCity) {
                console.log('stored/detected city:', storedLastCity, detectedCity);
                const cityToUse = (storedLastCity || detectedCity).toLowerCase();
                this.props.history.push('/' + cityToUse);
            }
        } catch (err) {
            console.error('Can not process stored/detected city', err);
        }
    }
    componentDidUpdate(prevProps, prevState) {
    }
    componentWillUnmount() {
    }
    render() {
        return (
            <div>
            start page
            </div>
        );
    }
}

const StartPageWithRouter = withRouter(connect()(StartPage));

export default StartPageWithRouter