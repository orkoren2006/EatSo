import React from 'react'




export function BookingPreview({ booking, onChangeStatusBooking }) {
    return (
        <div className="booking-preview">
            <div>{booking.guest.fullName}</div>
            <button onClick={()=>onChangeStatusBooking(booking._id, 'approved')}>V</button>
            <button onClick={()=>onChangeStatusBooking(booking._id, 'rejected')}>X</button>
        </div>
    )
}

