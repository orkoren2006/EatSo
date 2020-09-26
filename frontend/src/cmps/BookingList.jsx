import React from 'react'
import { expService } from '../services/expService'
import { BookingPreview } from './BookingPreview'


export function BookingList({ bookings, onChangeStatusBooking }) {
    
    return (
        <div className="booking-list">
            
                <div>Guest</div>
                <div>Experience Name</div>
                <div>Approve/Reject</div>
            
            {bookings.map(booking => <BookingPreview key={booking._id} booking={booking} onChangeStatusBooking={onChangeStatusBooking} />)}
        </div>
    )
}

