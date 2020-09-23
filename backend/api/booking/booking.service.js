
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    remove,
    update,
    add
}

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('booking')
    try {
        const bookings = await collection.find(criteria).toArray();
        return bookings
    } catch (err) {
        console.log('ERROR: cannot find bookings')
        throw err;
    }
}

async function getById(bookingId) {
    const collection = await dbService.getCollection('booking')
    try {
        const booking = await collection.findOne({ "_id": ObjectId(bookingId) })
        return booking
    } catch (err) {
        console.log(`ERROR: while finding booking ${bookingId}`)
        throw err;
    }
}

async function remove(bookingId) {
    const collection = await dbService.getCollection('booking')
    try {
        await collection.deleteOne({ "_id": ObjectId(bookingId) })
    } catch (err) {
        console.log(`ERROR: cannot remove booking ${bookingId}`)
        throw err;
    }
}

async function update(booking) {
    const collection = await dbService.getCollection('booking')
    booking._id = ObjectId(booking._id);

    try {
        await collection.replaceOne({ "_id": booking._id }, { $set: booking })
        return booking
    } catch (err) {
        console.log(`ERROR: cannot update booking ${booking._id}`)
        throw err;
    }
}

async function add(booking) {
    const collection = await dbService.getCollection('booking')
    try {
        await collection.insertOne(booking);
        return booking;
    } catch (err) {
        console.log(`ERROR: cannot insert booking`)
        throw err;
    }
}

function _buildCriteria(filterBy) {
    const criteria = {};
    if (filterBy.status) {
        criteria.status =  filterBy.status;
    }
    return criteria;
}




// user.givenReviews = await reviewService.query({ byUserId: ObjectId(user._id) })
// user.givenReviews = user.givenReviews.map(review => {
//     delete review.byUser
//     return review
// })