import axios from "axios";

export default class AxiosConfigService {
    postRequest = (data, url) => {
        const config = { method: 'POST', data, url };
        return axios(config);
    }
    getRequest = (url) => {
        const config = { method: 'GET', url };
        return axios(config);
    }
}