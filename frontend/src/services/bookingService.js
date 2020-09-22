
import storageService from './asyncStorageService'
import { expService } from './expService';
import { httpService } from './httpService'


const bookingService = {
    getBookings,
    getById,
    remove,
    update,
    getEmpty
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
    console.log(filterBy);
    const keys = Object.keys(filterBy)
    const values = Object.values(filterBy)
    // const field = (keys[0] === 'participants') ? 'guest' : 'owner'
    console.log(bookings);
    // debugger
    const valueRegex = new RegExp(`${values[0]}`, 'i')
    switch (keys[0]) {
        case 'participants':
            bookingsToReturn = bookings.filter(async (booking) => {
                const exp = await expService.getExpById(booking.exp._id)
                const timeDiff = (Date.now() - exp.schedule.at < 0) ? true : false; // true for upcoming, false for past
                return (booking.guest._id === values[0] &&
                    booking.status === 'approved')
            })
            break;
        // case 'owner':

        default:
            break;
    }
    console.log(bookingsToReturn);
    return bookingsToReturn
}