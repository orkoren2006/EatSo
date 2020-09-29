import React from 'react'
import { expService } from '../services/expService'
import { BookingPreview } from './BookingPreview'


export function BookingList({ bookings, onChangeStatusBooking }) {
    
    return (
        <section className="host-booking-queue">
            <h3>Booking Queue</h3>
            <div className="booking-list">
                {/* <div style={{ fontWeight: 'bold' }}>Guest</div>
                <div style={{ fontWeight: 'bold' }}>Quantity</div>
                <div style={{ fontWeight: 'bold' }}>Experience Name</div>
                <div style={{fontWeight:'bold'}}>Approve/Reject</div>
                 */}
                {bookings.map(booking => <BookingPreview key={booking._id} booking={booking} onChangeStatusBooking={onChangeStatusBooking} />)}
            </div>
        </section>
    )
}

