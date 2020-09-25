import React from 'react'
import { BookingPreview } from './BookingPreview'


export function BookingList({ bookings, onChangeStatusBooking }) {
    return (
        <div className="grid-container">
            {bookings.map(booking => <BookingPreview key={booking._id} booking={booking} onChangeStatusBooking={onChangeStatusBooking} />)}
        </div>
    )
}

