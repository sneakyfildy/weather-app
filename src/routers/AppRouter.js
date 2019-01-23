import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
//
import StartPage from '../components/StartPage';
import CityPageWeekly from '../components/CityPageWeekly';
import CityPageHourly from '../components/CityPageHourly';
import NotFoundPage from '../components/NotFoundPage';
import Header from '../components/Header';

const AppRouter = () => (
    <BrowserRouter>
        <div className="weather-app-container">
            <Header />
            <Switch>
                <Route path="/" component={StartPage} exact={true} />
                <Route path="/:city/:dateLabel" component={CityPageHourly} />
                <Route path="/:city" component={CityPageWeekly} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;
