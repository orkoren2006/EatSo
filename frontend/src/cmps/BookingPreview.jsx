import React from 'react'
import { expService } from '../services/expService'
import { UserPreview } from './UserPreview'




export function BookingPreview({ booking, onChangeStatusBooking }) {
    // const exp = expService.getById(booking.exp._id)
    const numOfGuests = booking.numOfGuests;
    return (
        <React.Fragment>
            <UserPreview user={booking.guest} />
            <div>{numOfGuests} {numOfGuests > 1 ? 'guest' : 'guests'}</div>
            <div>{booking.exp.name}</div>
            <div>
                <button onClick={() => onChangeStatusBooking(booking._id, 'approved')}>V</button>
                <button onClick={() => onChangeStatusBooking(booking._id, 'rejected')}>X</button>
            </div>
        </React.Fragment>
    )
}

