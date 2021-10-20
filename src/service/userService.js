import axios from "axios";
import authHeader from './authHeader';

const api = 'http://localhost:8000/api/test';

class UserService{
    getPublicContent() {
        return axios.get(api + 'all');
    }

    getUserBoard() {
        return axios.get(api + 'user', { headers: authHeader() });
    }

    getModeratorBoard() {
        return axios.get(api + 'mod', { headers: authHeader() });
    }

    getAdminBoard() {
        return axios.get(api + 'admin', { headers: authHeader() });
    }
}

export default new UserService();