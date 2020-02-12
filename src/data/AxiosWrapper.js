import axios from 'axios'
export default class AxiosWrapper {
    _apiKey = '51d5e291a5f80482';
    baseUrl = 'https://geo.tatar.ru';
    request (url, method, options) {
        if (method === 'get') {
            return axios.get(this.baseUrl + url, options);
        } else {
            return axios.post(this.baseUrl + url, options);
        }
    }

    getLayer (guid) {
        return this.request('/api/layers/' + guid, 'get', {headers: {'X-App': '51d5e291a5f80482', 'Content-Type': 'application/json'}});
    }
}
