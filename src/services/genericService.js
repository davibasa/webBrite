import axios from "axios";
import Global from "../utils/Global";

class GenericService {
    constructor(baseURL, timeout = 50000) {
        this.client = axios.create({
            baseURL,
            timeout,
        });
    };

    async getRequest(endpoint, params = {}, headersParams = {}) {
        try {
            await Global.addHeaders(this.client, window.localStorage, headersParams);
            const response = await this.client.get(Global.Api + endpoint, { params });
            return response.data;
        } catch (error) {
            throw new Error(`GET request failed: ${error.message}`);
        }
    };
    
    async postRequest(endpoint, data, headersParams = {}) {
        try {
            await Global.addHeaders(this.client, window.localStorage, headersParams);
            const response = await this.client.post(Global.Api + endpoint, data);
            return response.data;
        } catch (error) {
            throw new Error(`POST request failed: ${error.message}`);
        }
    };
    
    async deleteRequest(endpoint, headersParams = {}) {
        try {
            await Global.addHeaders(this.client, window.localStorage, headersParams);
            const response = await this.client.delete(Global.Api + endpoint);
            return response.data;
        } catch (error) {
            throw new Error(`Delete request failed: ${error.message}`);
        }
    };
}

export default new GenericService(Global.Api);
