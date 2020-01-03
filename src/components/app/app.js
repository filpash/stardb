import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';
import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';

import {
    PeoplePage,
    PlanetPage,
    StarshipsPage,
    LoginPage,
    SecretPage} from '../pages';


import { SwapiServiceProvider } from '../swapi-service-context';

import './app.css';

import { BrowserRouter as Router, Route } from "react-router-dom";
import StarshipDetails from "../sw-components/starship-details";
import PlanetDetails from "../sw-components/planet-details";

export default class App extends Component {

    state = {
        swapiService: new SwapiService(),
        isLoggedIn: false
    };

    onLogin = () => {
        this.setState({
            isLoggedIn: true
        })
    }

    onServiceChange = () => {
        this.setState(({ swapiService }) => {

            const Service = swapiService instanceof SwapiService ?
                DummySwapiService : SwapiService;

            return {
                swapiService: new Service()
            };
        });
    };

    render() {

        const { isLoggedIn } = this.state;

        return (
            <ErrorBoundry>
                <SwapiServiceProvider value={this.state.swapiService} >
                    <Router>
                        <div className="stardb-app">
                            <Header onServiceChange={this.onServiceChange} />

                            {<RandomPlanet/>}

                                    <Route path="/"
                                           render={() => <h2>Welcome to StarDB</h2>}
                                           exact />

                                    <Route path="/people/:id?" exact component={PeoplePage} />

                                    <Route path="/planets"
                                           render={() => <h2>Planets</h2>}
                                           exact />
                                    <Route path="/planets" exact component={PlanetPage} />
                                    <Route path="/planets/:id"
                                           render={({ match }) => {
                                               const { id } = match.params;
                                               return <PlanetDetails itemId={id} />
                                           }}/>

                                    <Route path="/starships"
                                           render={() => <h2>Starships</h2>}
                                           exact />
                                    <Route path="/starships" exact component={StarshipsPage} />
                                    <Route path="/starships/:id"
                                           render={({ match }) => {
                                               const { id } = match.params;
                                               return <StarshipDetails itemId={id} />
                                           }}/>
                                    <Route
                                        path="/login"
                                        render={() => (
                                            <LoginPage
                                                isLoggedIn={isLoggedIn}
                                                onLogin={this.onLogin}/>
                                        )}/>

                                    <Route
                                        path="/secret"
                                        render={() => (
                                            <SecretPage isLoggedIn={isLoggedIn} />
                                        )}/>

                        </div>
                    </Router>
                </SwapiServiceProvider>
            </ErrorBoundry>
        );
    }
}
