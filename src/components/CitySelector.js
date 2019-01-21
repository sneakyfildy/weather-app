import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter } from '../actions/filters';

class CitySelector extends React.Component {
    state = {};

    render (){
        return (
            <div>
                city
                <input
                    type="text"
                    value={this.props.filters.text}
                    placeholder="Filter by city name"
                    onChange={(e) => {
                        this.props.dispatch(setTextFilter(e.target.value));
                    }}
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