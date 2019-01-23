import React from 'react';
import { connect } from 'react-redux';

import { clearDb, fillDbs } from '../actions/db';

class DebugControls extends React.Component {
    state = {};

    render (){
        return (
            <div className="debug-controls-component">
                <button onClick={() => this.props.dispatch(clearDb('weather'))}
                >Clear Weather DB</button>
                <button onClick={() => this.props.dispatch(clearDb('cities'))}
                >Clear Cities DB</button>

                <button onClick={() => this.props.dispatch(fillDbs())}
                >Fill DB (prefixed cities and random weather)</button>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
    };
};

export default connect(mapStateToProps)(DebugControls);