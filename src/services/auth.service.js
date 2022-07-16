import axios from 'axios'

export const authService = {
    login,
    logout,
    signup
}

const STORAGE_KEY = 'loggedInUser'


const BASE_URL = (process.env.NODE_ENV !== 'development')
               ? '/api/auth/'
               : '//localhost:3030/api/auth/';



async function login(credentials) {
    return axios.post(BASE_URL + 'login', credentials, {withCredentials: true})
        .then((res) => res.data)
        .then(user => {
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user))
            return user
        })
}

function signup(signupInfo) {
    return axios.post(BASE_URL + 'signup', signupInfo)
        .then(res => res.data)
        .then(user => {
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user))
            return user
        })

}

function logout() {
    sessionStorage.removeItem(STORAGE_KEY)
    return axios.post(BASE_URL + 'logout')
}