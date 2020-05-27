class SwapiService {
    _apiBase = `https://swapi.dev/api`;
    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` + `, received ${res.status}`)
        }
        return await res.json();
    }
    getAllPeople() {
        return this.getResource(`/people/`);
    }
    getPerson(id) {
        return this.getResource(`/people/${id}`);
    }

}
const swapi = new SwapiService();
swapi.getPerson(3).then((p) => {
    console.log(p.name)
})