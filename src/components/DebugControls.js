import React from 'react';
import { connect } from 'react-redux';
import { clearDb } from '../actions/db';

class DebugControls extends React.Component {
    state = {};

    clearDb(e) {
        this.props.dispatch(clearDb());
    }

    render (){
        return (
            <div>
                <button onClick={() => this.clearDb()}
                >Clear DB</button>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
    };
};

export default connect(mapStateToProps)(DebugControls);