import React from 'react';
import { connect } from 'react-redux';
import selectCities from '../selectors/cities';
import { selectCity } from '../actions/citySelector';

const CityList = (props) => (
  <div>
    <h3>City List {props.selectedId && <b>: {props.selectedCity.title}</b> }</h3>

    {props.cities.map((city) => {
        return <div
        onClick={() => props.dispatch(selectCity(city.id))}
        className="clickable"
        key={city.id} {...city}>{city.id}: <b>{city.title}</b></div>;
    })}
  </div>
);

const mapStateToProps = (state) => {
  return {
    cities: selectCities(state.cities.items, state.filters),
    selectedId: state.cities.selectedId,
    selectedCity: state.cities.selectedItem
  };
};

export default connect(mapStateToProps)(CityList);