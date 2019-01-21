import React from 'react';
import CitySelector from './CitySelector';
import CityList from './CityList';

export default class WeatherApp extends React.Component {
    constructor (props){
        super(props);
        this.title = 'Weather test';
        this.state = {
        };
    }
    componentDidMount (){
    }
    componentDidUpdate (prevProps, prevState){
    }
    componentWillUnmount (){
    }
    render (){

        return (
            <div>
                <h2>{this.title}</h2>
                <CitySelector />
                <CityList />
            </div>
        );
    }
}