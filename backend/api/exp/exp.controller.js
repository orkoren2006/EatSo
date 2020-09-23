const expService = require('./exp.service')
const logger = require('../../services/logger.service')




async function getExp(req, res) {
    try {
        const exp = await expService.getById(req.params.id)
        res.send(exp)
    } catch (err) {
        logger.error('Cannot get exp', err);
        res.status(500).send({ error: 'cannot get exp' })
    }
}


async function getExps(req, res) {
    console.log('get exps',req.query);
    try {
        const exps = await expService.query(req.query)
        res.send(exps)
    } catch (err) {
        logger.error('Cannot get exps', err);
        res.status(500).send({ error: 'cannot get exps' })
    }
}

async function deleteExp(req, res) {
    try {
        await expService.remove(req.params.id)
        res.end()
    } catch (err) {
        logger.error('Cannot delete exp', err);
        res.status(500).send({ error: 'cannot delete exp' })
    }
}

async function updateExp(req, res) {
    try {
        const exp = req.body;
        await expService.update(exp)
        res.send(exp)
    } catch (err) {
        logger.error('Cannot update exp', err);
        res.status(500).send({ error: 'cannot update exp' })
    }
}

module.exports = {
    getExp,
    getExps,
    deleteExp,
    updateExp
}