import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter, submitFilter, clearFilter } from '../actions/filters';

import CityList from './CityList';

class CitySelector extends React.Component {
    // local state
    state = {isFocused: false};

    onKeyDown(e) {
        switch(e.keyCode) {
            case 13: // ENTER
                this.props.dispatch(submitFilter(e.target.value));
                break;
            case 27: // ESC
                this.props.dispatch(clearFilter());
                break;
        }
    }
    onFocus () {
        this.setState({
            isFocused: true
        });
    }

    onBlur () {
        setTimeout(() => {
            this.setState({
                isFocused: false
            });
        }, 300);
    }
    render (){
        return (
            <div className="city-selector-component">
                <div className="input-container">
                    <input
                        type="text"
                        value={this.props.filters.text}
                        placeholder="Filter by city; Focus to see the list; ESC to clear"
                        onChange={(e) => {
                            this.props.dispatch(setTextFilter(e.target.value));
                        }}
                        onFocus={ () => this.onFocus() }
                        onBlur={ () => this.onBlur() }
                        onKeyDown={(e) => this.onKeyDown(e)}
                    />
                    <CityList isVisible={this.state.isFocused}/>
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        filters: state.filters,
        selectedCity: state.cities.selectedItem.title
    };
};

export default connect(mapStateToProps)(CitySelector);