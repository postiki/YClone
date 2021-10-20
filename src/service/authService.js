import axios from "axios";

const api = 'http://localhost:8000/api/auth/'

class AuthService {

    login(username, password) {
        return axios.post(api + 'login', {
            username: username,
            password: password
        })
            .then(r => {
                if (r.data.accessToken) {
                    localStorage.setItem('user', JSON.stringify(r.data));
                }
                return r.data
            })
    }

    logout(){
        localStorage.removeItem('user')
    }

    register(username, email, password){
        return axios.post(api + 'signup', {
            username,
            email,
            password
        })
    }
}

export default new AuthService()