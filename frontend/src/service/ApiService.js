import axios from "axios";

export default class ApiService {
    baseUrl = 'http://localhost:8080/api';

    findSearchResults() {
        this.getRequest(`/search?searchTerm=${this.state.searchTerm}`);
    }

    getRequest(path) {
        axios.get(this.baseUrl + path);
    }

    postRequest() {

    }
}