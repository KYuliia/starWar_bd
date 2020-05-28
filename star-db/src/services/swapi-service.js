export default class SwapiService {

    _apiBase = 'https://swapi.dev/api';

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` +
                `, received ${res.status}`)
        }
        return await res.json();
    }

    async getAllPeople() {
        const res = await this.getResource(`/people/`);
        return res.results.map(this._transformPerson);
    }

    async getPerson(id) {
        const person = this.getResource(`/people/${id}/`);
        return this._transformPerson(person);
    }

    async getAllPlanets() {
        const res = await this.getResource(`/planets/`);
        return res.results.map(this._transformPlanet);
    }

    async  getPlanet(id) {
        const planet = await this.getResource(`/planets/${id}/`);
        return this._transformPlanet(planet);
    }

    async getAllStarships() {
        const res = await this.getResource(`/starships/`);
        return res.results.map(this._transformStarship);
    }

    async getStarship(id) {
        const starship = this.getResource(`/starships/${id}/`);
        return this._transformStarship(starship);

    }
    _extractId(item) {
        const idRegExp = /\/([0-9]*)\/$/;
        return item.url.match(idRegExp)[1];
    }
    _transformPlanet(planet) {
        return {
            id: this._extractId(planet),
            name: planet.name,
            population: planet.population,
            rotationPeriod: planet.rotation_period,
            diameter: planet.diameter
        }
    }
    _transformStarship(startship) {
        return {
            id: this._extractId(startship),
            name: startship.name,
            model: startship.model,
            manufacture: startship.manufacture,
            costInCredits: startship.costInCredits,
            lenght: startship.lenght,
            crew: startship.crew,
            passengers: startship.passengers,
            cargoCapacity: startship.cargoCapacity
        }
    }
    _transformPerson(person) {
        return {
            name: person.name,
            gender: person.gender,
            birthYear: person.birthYear,
            eyeColor: person.eyeColor
        }
    }
}

