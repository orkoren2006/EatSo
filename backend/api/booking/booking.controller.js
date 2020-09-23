const bookingService = require('./booking.service')
const logger = require('../../services/logger.service')




async function getBooking(req, res) {
    try {
        const booking = await bookingService.getById(req.params.id)
        res.send(booking)
    } catch (err) {
        logger.error('Cannot get booking', err);
        res.status(500).send({ error: 'cannot get booking' })
    }
}


async function getBookings(req, res) {
    try {
        const bookings = await bookingService.query(req.query)
        res.send(bookings)
    } catch (err) {
        logger.error('Cannot get bookings', err);
        res.status(500).send({ error: 'cannot get bookings' })
    }
}

async function deleteBooking(req, res) {
    try {
        await bookingService.remove(req.params.id)
        res.end()
    } catch (err) {
        logger.error('Cannot delete booking', err);
        res.status(500).send({ error: 'cannot delete booking' })
    }
}

async function updateBooking(req, res) {
    try {
        const booking = req.body;
        await bookingService.update(booking)
        res.send(booking)
    } catch (err) {
        logger.error('Cannot update booking', err);
        res.status(500).send({ error: 'cannot update booking' })
    }
}

module.exports = {
    getBooking,
    getBookings,
    deleteBooking,
    updateBooking
}