

import { httpService } from './httpService'


export const bookingService = {
    query,
    getById,
    remove,
    update,
    getEmpty,
    save
}


async function query(filterBy = {}) {
    const bookings = await httpService.get('booking')
    let bookingsToReturn = bookings;
    if (Object.keys(filterBy).length) bookingsToReturn = _getBookings(bookings, filterBy)
    return bookingsToReturn;
}

function getById(bookingId) {
    return httpService.get(`booking/${bookingId}`)
}
function remove(bookingId) {
    return httpService.delete(`booking/${bookingId}`)
}

function update(booking) {
    return httpService.put(`booking/${booking._id}`, booking)
}

function save(booking) {
    if (booking._id) {
        booking.updatedAt = Date.now();
        return httpService.put(`booking/${booking._id}`, booking)
    } else { 
        return httpService.post('booking', booking)
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