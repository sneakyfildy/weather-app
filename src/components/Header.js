import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';

import CitySelector from './CitySelector';
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
                <div className="header-inner-wrap">
                    <span className="logo-text">Weather app</span>
                    <DebugControls />
                </div>
                <CitySelector />
            </header>
        );
    }
}

export default connect()(Header)
