import React from 'react';
import { connect } from 'react-redux';
import selectCities from '../selectors/cities';
import { selectCity } from '../actions/citySelector';
import { withRouter } from 'react-router';
import { capitalize } from '../services/common-utils';

export class CityList extends React.Component {
    onSelectCity(city) {
        this.props.history.push(`/${city.title.toLowerCase()}`);
        this.props.dispatch(selectCity(city.title, this.props.history));
    }
    render() {
        let className = 'city-chooser-list ' + (this.props.isVisible ? 'visible' : 'hidden');
        return(
            <div>
                <div className={className}>
                    {this.props.cities.map((city, index) => {
                        let className = 'clickable list-item';
                        // commented out, no time for this
//                        // highlight first matching item
//                        // todo: move this computation to reducer?
//                        if (!!this.props.filterText && index === 0) {
//                            className += ' first-matching';
//                        }
                        return (<div
                            onClick={() => this.onSelectCity(city)}
                            className={className}
                            key={city.__key__} {...city}
                            >
                                {capitalize(city.title)}
                            </div>);
                    })}
                </div>
            </div>
        );};
};

const mapStateToProps = (state) => {
    return {
        cities: selectCities(state.cities.items, state.filters),
        selectedCity: state.cities.selectedItem,
        filterText: state.filters.text
    };
};

const CityListWithRouter = withRouter(connect()(CityList));

export default connect(mapStateToProps)(CityListWithRouter);