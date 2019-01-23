import React from 'react';
import { connect } from 'react-redux';
import selectCities from '../selectors/cities';
import { selectCity } from '../actions/citySelector';

const CityList = (props) => {
    return (
      <div>
        <h3>City List {props.selectedId && <b>: {props.selectedCity.title}</b> }</h3>

        {props.cities.map((city, index) => {
            let className = 'clickable';
            // highlight first matching item
            // todo: move this computation to reducer?
            if (!!props.filterText && index === 0) {
                className += ' first-matching';
            }

            return <div
                onClick={() => props.dispatch(selectCity(city.__key__, city.title))}
                className={className}
                key={city.__key__} {...city}
                >
                    {city.id}: <b>{city.title}</b>
                </div>;
            })}
      </div>
    );
}

const mapStateToProps = (state) => {
  return {
    cities: selectCities(state.cities.items, state.filters),
    selectedId: state.cities.selectedId,
    selectedCity: state.cities.selectedItem,
    filterText: state.filters.text
  };
};

export default connect(mapStateToProps)(CityList);