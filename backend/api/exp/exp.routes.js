const express = require('express')
const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const {getExp, getExps, deleteExp, updateExp, addExp} = require('./exp.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getExps)
router.get('/:id', getExp)
router.post('/',requireAuth, addExp)
router.put('/:id',  requireAuth, updateExp)
router.delete('/:id',  requireAuth, requireAdmin, deleteExp)

module.exports = router