import config from "../config/config";
// const axios = require('axios').default;

export default class EmployeeService {
    baseUrl = config.basUrl;
    addEmployee = (data) => {
        localStorage.put('data', data);
        //return axios.post(`${this.baseUrl}employee`, data);
    }
}