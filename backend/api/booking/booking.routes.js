const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { getBooking, getBookings, deleteBooking, updateBooking, addBooking } = require('./booking.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getBookings)
router.get('/:id', getBooking)
router.post('/',requireAuth, addBooking)
router.put('/:id', requireAuth, updateBooking)
router.delete('/:id', requireAuth, requireAdmin, deleteBooking)

module.exports = router