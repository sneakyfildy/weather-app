import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
//
import { getCities } from '../actions/db';

export class StartPage extends React.Component {
    constructor(props) {
        super(props);
        this.title = 'Weather test';
        this.state = {
        };
    }
    componentDidMount() {
        this.props.history.push('/new-location');
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

// Create a new component that is "connected" (to borrow redux
// terminology) to the router.
const StartPageWithRouter = withRouter(StartPage);

export default connect()(StartPageWithRouter)