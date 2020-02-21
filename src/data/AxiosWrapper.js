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

    getHeaders () {
        return {headers: {'X-App': '51d5e291a5f80482', 'Content-Type': 'application/json'}};
    }

    getLayer (guid) {
        return this.request('/api/layers/' + guid, 'get', this.getHeaders());
    }

    getLayerFeatures (guid) {
        return this.request('/api/layers/' + guid + '/features', 'get', this.getHeaders());
    }
}
