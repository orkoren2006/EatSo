import storageService from './asyncStorageService'
import { httpService } from './httpService'

const userService = {
    login,
    logout,
    signup,
    getUsers,
    getById,
    remove,
    update
}

window.userService = userService;
export default userService;

function getUsers() {
    return httpService.get('user')
    // return storageService.query('user')
}

function getById(userId) {
    // return httpService.get(`user/${userId}`)
    return storageService.get('user', userId)
}
function remove(userId) {
    // return httpService.delete(`user/${userId}`)
    return storageService.remove('user', userId)
}

function update(user) {
    return storageService.put('user', user)
    // return httpService.put(`user/${user._id}`, user)
}

async function login(userCred) {
    // const user = await httpService.post('auth/login', userCred)
    const users = await httpService.get('user')
    // const users = await storageService.query('user')
    const user = users.find(user =>
        (user.email === userCred.email &&
            user.password === userCred.password))

    if (user) return _handleLogin(user)
    else {return Promise.reject('Invalid email or password')}
}

async function signup(userCred) {
    // const user = await httpService.post('auth/signup', userCred)
    const user = await storageService.post('user', userCred)
    return _handleLogin(user)
}
async function logout() {
    // await httpService.post('auth/logout');
    sessionStorage.clear();
}
function _handleLogin(user) {
    sessionStorage.setItem('user', JSON.stringify(user))
    return user;
}