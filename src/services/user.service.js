import { httpService } from './http.service'

export const userService = {
    getLoggedInUser,
    remove,
    getUsers,
    update,
    getById,
    login,
    logout,
    signup
}

const STORAGE_KEY = 'loggedInUser'

function getUsers() {
    // return storageService.query('user')
    return httpService.get(`user`)
}


function remove(userId) {
    // return storageService.remove('user', userId)
    return httpService.delete(`user/${userId}`)
}

async function update(user) {
    // await storageService.put('user', user)
    user = await httpService.put(`user/${user._id}`, user)
    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) _saveLocalUser(user)
    return user
}

async function getById(userId) {
    // const user = await storageService.get('user', userId)
    const user = await httpService.get(`user/${userId}`)
    // gWatchedUser = user
    return user
}

// Login, logout, signup (auth)

async function login(userCred) {
    // const users = await storageService.query('user')
    // const user = users.find(user => user.username === userCred.username)
    // return _saveLocalUser(user)

    const user = await httpService.post('auth/login', userCred)
    // socketService.emit('set-user-socket', user._id)
    if (user) return _saveLocalUser(user)
}
async function signup(userCred) {
    // userCred.score = 10000
    // const user = await storageService.post('user', userCred)
    const user = await httpService.post('auth/signup', userCred)
    // socketService.emit('set-user-socket', user._id)
    return _saveLocalUser(user)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY)
    return await httpService.post('auth/logout')
}

function _saveLocalUser(user) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    return user
}


function getLoggedInUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY))
}