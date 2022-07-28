import { httpService } from './http.service'
import { utilService } from './util.service'
// const reviewService = require('../review/review.service')

const ENDPOINT = 'toy'

export const toyService = {
    query,
    getById,
    remove,
    save,
    getEmptyToy
}

// TODO: support paging and filtering and sorting
async function query(filterBy = {}) {
    return await httpService.get(ENDPOINT, filterBy)

}

async function save(toy) {
    return toy._id
    ? await httpService.put(`${ENDPOINT}/${toy._id}`, toy)
    : await httpService.post(ENDPOINT, toy)
    
}

async function remove(toyId) {
    return await httpService.delete(`${ENDPOINT}/${toyId}`)
}

async function getById(toyId) {
    return await httpService.get(`${ENDPOINT}/${toyId}`)
}

function getEmptyToy() {
    return {
        name: '',
        price: utilService.getRandomInt(10, 60),
        labels: [],
        createdAt: Date.now(),
        inStock: true
    }
}
