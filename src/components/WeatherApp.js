import React from 'react';

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
            </div>
        );
    }
}