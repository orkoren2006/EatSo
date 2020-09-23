const express = require('express')
const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const {getBooking, getBookings, deleteBooking, updateBooking} = require('./booking.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getBookings)
router.get('/:id', getBooking)
router.put('/:id',  requireAuth, updateBooking)
router.delete('/:id',  requireAuth, requireAdmin, deleteBooking)

module.exports = router