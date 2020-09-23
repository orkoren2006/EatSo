const userService = require('./user.service')
const logger = require('../../services/logger.service')




async function getUser(req, res) {
    try {
        const user = await userService.getById(req.params.id)
        res.send(user)
    } catch (err) {
        logger.error('Cannot get user', err);
        res.status(500).send({ error: 'cannot get user' })
    }
}


async function getUsers(req, res) {
    try {
        const users = await userService.query(req.query)
        res.send(users)
    } catch (err) {
        logger.error('Cannot get users', err);
        res.status(500).send({ error: 'cannot get users' })
    }
}

async function deleteUser(req, res) {
    try {
        await userService.remove(req.params.id)
        res.end()
    } catch (err) {
        logger.error('Cannot delete user', err);
        res.status(500).send({ error: 'cannot delete user' })
    }
}

async function updateUser(req, res) {
    try {
        const user = req.body;
        await userService.update(user)
        res.send(user)
    } catch (err) {
        logger.error('Cannot update user', err);
        res.status(500).send({ error: 'cannot update user' })
    }
}

module.exports = {
    getUser,
    getUsers,
    deleteUser,
    updateUser
}