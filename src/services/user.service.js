import axios from 'axios'

export const userService = {
    getLoggedInUser,
    removeUser,
    query,
    updateUser,
    getUser
}

const BASE_URL = (process.env.NODE_ENV !== 'development')
    ? '/api/user/'
    : '//localhost:3030/api/user/';

const STORAGE_KEY = 'loggedInUser'

async function query() {
    try {
        const res = await axios.get(BASE_URL)
        return res.data
    } catch(err) {
        console.log('couldnt get users', err);
    }
}

function getLoggedInUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY))
}

async function removeUser(userId) {
    try {
        const res = await axios.delete(BASE_URL + userId)
        return res.data
    } catch(err) {
        console.log('couldnt remove user', err);
    }
}

async function updateUser(userId) {
    try {
        const res = await axios.put(BASE_URL + userId)
        return res.data
    } catch(err) {
        console.log('couldnt update user', err);
    }
}

async function getUser(userId) {
    try {
        const res = axios.get(BASE_URL + userId)
        return res.data
    } catch(err) {
        console.log('couldnt update user', err);
    }
}