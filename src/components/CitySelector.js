import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter, submitFilter, clearFilter } from '../actions/filters';

class CitySelector extends React.Component {
    state = {};

    onKeyDown(e) {debugger
        switch(e.keyCode) {
            case 13: // ENTER
                this.props.dispatch(submitFilter(e.target.value));
                break;
            case 27: // ESC
                this.props.dispatch(clearFilter());
                break;
        }
    }

    render (){
        return (
            <div>
                city
                <input
                    type="text"
                    value={this.props.filters.text}
                    placeholder="Filter by city; ESC to clear"
                    onChange={(e) => {
                        this.props.dispatch(setTextFilter(e.target.value));
                    }}
                    onKeyDown={(e) => this.onKeyDown(e)}
                />
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        filters: state.filters
    };
};

export default connect(mapStateToProps)(CitySelector);