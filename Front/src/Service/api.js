const API_URL = 'http://localhost:8000/api/v1/';

const basicFetch = async (endpoint) => {
    const req = await fetch(`${API_URL}${endpoint}`);
    const json = await req.json();
    return json;
}

export default {
    get_infosAnimais: async () => {
        return await basicFetch(`animal/`)
    }

}