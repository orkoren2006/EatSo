
import storageService from './asyncStorageService'
import { httpService } from './httpService'

const bookingService = {
    getBookings,
    getById,
    remove,
    update
}

window.bookingService = bookingService;
export default bookingService;

async function getBookings(filterBy = {}) {
    const bookings = await httpService.get('booking')
    let bookingsToReturn = bookings;

    if (Object.keys(filterBy).length) bookingsToReturn = _getBookings(bookings, filterBy)
    return bookingsToReturn;
    // return storageService.query('booking')
}

function getById(bookingId) {
    // return httpService.get(`booking/${bookingId}`)
    return storageService.get('booking', bookingId)
}
function remove(bookingId) {
    // return httpService.delete(`booking/${bookingId}`)
    return storageService.remove('booking', bookingId)
}

function update(booking) {
    return storageService.put('booking', booking)
    // return httpService.put(`booking/${booking._id}`, booking)
}

function _getBookings(bookings, filterBy) {
    let bookingsToReturn;

    const { field, keyWord } = filterBy

    switch (field) {
        case 'past':
            bookingsToReturn = bookings.filter(booking => {
                return (booking.guest._id === keyWord &&
                    booking.exp.schedule.at < Date.now() &&
                    booking.status === 'approved')
            })
            break;

        default:
            break;
    }

    return bookingsToReturn
}