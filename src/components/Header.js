import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';

import CitySelector from './CitySelector';
import CityList from './CityList';
import DebugControls from './DebugControls';
import { getCities } from '../actions/db';

export class Header extends React.Component {
    constructor(props) {
        super(props);
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
            <header>
                <h1>Weather app</h1>
                <DebugControls />
                <CitySelector />
                <CityList />
            </header>
        );
    }
}

export default connect()(Header)
