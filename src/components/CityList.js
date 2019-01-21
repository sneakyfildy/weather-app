import React from 'react';
import { connect } from 'react-redux';
import selectCities from '../selectors/cities';

const CityList = (props) => (
  <div>
    <h3>City List</h3>
    {props.cities.map((city) => {
        return <div key={city.id} {...city}>{city.id}: <b>{city.title}</b></div>;
    })}
  </div>
);

const mapStateToProps = (state) => {
  return {
    cities: selectCities(state.cities, state.filters)
  };
};

export default connect(mapStateToProps)(CityList);