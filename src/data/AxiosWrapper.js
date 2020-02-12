import axios from 'axios'
export default class AxiosWrapper {
    _apiKey = '51d5e291a5f80482';
    baseUrl = 'https://geo.tatar.ru';
    request (url, method, options) {
        if (method === 'get') {
            return axios.get(url, options);
        } else {
            return axios.post(url, options);
        }
    }

    getLayer () {

    }
}
