
import storageService from './asyncStorageService'
import { expService } from './expService';
import { httpService } from './httpService'


const bookingService = {
    getBookings,
    getById,
    remove,
    update,
    getEmpty,
    save
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

async function save(booking) {
    if (booking._id) {
        booking.updatedAt = Date.now();
        // return httpService.put(`booking/${booking._id}`, booking)
        const updateBooking = await httpService.put(`booking/${booking._id}`, booking)
        return { booking: updateBooking, isNew: false }
    } else {
        const updateBooking = await httpService.post('booking', booking)
        return { booking: updateBooking, isNew: true }
    }
}

function getEmpty() {
    return {
        guest: {
          _id: '',
          fullName: '',
          imgUrl: ''
        },
        numOfGuests: 0,
        exp: {
          _id: '',
          name: '',
          title: '',
          imgUrls: [],
          price: 0,
          schedule: {
            at: 0,
            duration: 0
          }
        },
        status: "pending"
      }
}

function _getBookings(bookings, filterBy) {
    let bookingsToReturn;
    const keys = Object.keys(filterBy)
    const values = Object.values(filterBy)
    const valueRegex = new RegExp(`${values[0]}`, 'i')
    switch (keys[0]) {
        case '_id':
            bookingsToReturn = bookings.filter( (booking) => {
                return booking.guest._id === values[0]
            })
            break;
        default:
            break;
    }

    return bookingsToReturn
}