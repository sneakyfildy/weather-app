import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
//
import { getCities } from '../actions/db';

export class CityPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
    }
    componentDidUpdate(prevProps, prevState) {
    }
    componentWillUnmount() {
    }
    render() {
        return (
            <div>
            city page
            </div>
        );
    }
}

export default connect()(CityPage)