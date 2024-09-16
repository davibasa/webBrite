import axios from "axios";
import Global from "../utils/Global";

class GenericService {
    constructor(baseURL, timeout = 50000) {
        this.client = axios.create({
            baseURL,
            timeout,
        });
    }

    async getRequest(endpoint, params = {}, headersParams = {}, api = Global.Api) {
        var response;
        try {
            console.log(endpoint)
            await Global.addHeaders(this.client, window.localStorage, headersParams);
            response = await this.client.get(api + endpoint, { params });
            return response.data;
        } catch (error) {
            throw new Error(`GET request failed: ${error.message} | Response: ${response.message}`);
        }
    }
    
    async postRequest(endpoint, data, headersParams = {}, api = Global.Api) {
        var response;
        try {
            await Global.addHeaders(this.client, window.localStorage, headersParams);
            response = await this.client.post(api + endpoint, data);
            return response.data;
        } catch (error) {
            throw new Error(`POST request failed: ${error.message} | Response: ${response.message}`);
        }
    }
    
    async deleteRequest(endpoint, headersParams = {}, api = Global.Api) {
        var response;
        try {
            await Global.addHeaders(this.client, window.localStorage, headersParams);
            response = await this.client.delete(api + endpoint);
            return response.data;
        } catch (error) {
            throw new Error(`Delete request failed: ${error.message} | Response: ${response.message}`);
        }
    }
}

export default new GenericService(Global.Api);
