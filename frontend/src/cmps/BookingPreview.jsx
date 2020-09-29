import React from 'react'
import { expService } from '../services/expService'
import { UserPreview } from './UserPreview'
import { Button } from '@material-ui/core';

export function BookingPreview({ booking, onChangeStatusBooking }) {
    // const exp = expService.getById(booking.exp._id)
    const numOfGuests = booking.numOfGuests;
    return (
        <div className="booking-preview">
            <UserPreview user={booking.guest} /> 
            <div>{numOfGuests} {numOfGuests > 1 ? 'guest' : 'guests'}</div>
            <div className="name">({booking.exp.name})</div>
            <div className="buttons">
                <Button className="approved-btn"
                    onClick={() => onChangeStatusBooking(booking._id, 'approved')}>
                    Approve</Button>
                <Button className="reject-btn"
                    onClick={() => onChangeStatusBooking(booking._id, 'rejected')}>
                    Reject</Button>
            </div>
        </div>
    )
}

