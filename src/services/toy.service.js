import axios from 'axios'

export const toyService = {
    query,
    getById,
    remove,
    save,
    getEmptyToy
}

const BASE_URL = (process.env.NODE_ENV !== 'development')
               ? '/api/toy/'
               : '//localhost:3030/api/toy/';

// TODO: support paging and filtering and sorting
function query() {
    return axios.get(BASE_URL)
        .then((res) => res.data)
}

function save(toy) {
    if (toy._id) {
        return axios.put(BASE_URL + toy._id, toy)
            .then((res) => res.data)
    } else {
        return axios.post(BASE_URL, toy)
            .then((res) => res.data)
    }
}

function remove(toyId) {
    return axios.delete(BASE_URL + toyId)
        .then((res) => res.data)
}

function getById(toyId) {
    return axios.get(BASE_URL + toyId)
        .then((res) => res.data)
}

function getEmptyToy() {
    return {
        name: '',
        price: 100,
        labels: [],
        createdAt: Date.now(),
        inStock: true
    }
}
