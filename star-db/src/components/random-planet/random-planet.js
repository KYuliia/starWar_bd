import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service.js';
import Spinner from '../spinner/spinner.js';
import ErrorIdecator from '../error-indicator/error-indicator.js'
import './random-planet.css';

export default class RandomPlanet extends Component {
    state = {
        planet: {},
        loading: true,
        error: false
    };
    swapiService = new SwapiService();
    constructor() {
        super();
        this.updatePlanet();
    }
    updatePlanet() {
        const id = Math.floor(Math.random() * 15) + 2;
        this.swapiService.getPlanet(id).then((this.onPlanetLoaded)).catch(this.onError);
    }
    onPlanetLoaded = (planet) => {
        this.setState({ planet, loading: false, error: false })
    }
    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        });
    };
    render() {
        const { planet, loading, error } = this.state;
        const hasData = !(loading || error);
        const spinner = loading ? <Spinner /> : null;
        const errorMessage = error ? <ErrorIdecator /> : null;
        const content = hasData ? <PlanetView planet={planet}></PlanetView> : null;


        return (
            <div className="random-planet jumbotron rounded">
                {errorMessage}
                {spinner}
                {content}
            </div>

        );
    }
}
const PlanetView = ({ planet }) => {
    const { id, name, population, rotationPeriod, diameter } = planet;
    return (<React.Fragment>
        <img className="planet-image"
            src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
        <div>
            <h4>{name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    <span className="term">Population</span>
                    <span>{population}</span>
                </li>
                <li className="list-group-item">
                    <span className="term">Rotation Period</span>
                    <span>{rotationPeriod}</span>
                </li>
                <li className="list-group-item">
                    <span className="term">Diameter</span>
                    <span>{diameter}</span>
                </li>
            </ul>
        </div>
    </React.Fragment>);
}