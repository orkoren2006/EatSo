import React from 'react'
import { connect } from 'socket.io-client';
import { loadBookings } from '../store/actions/bookingAction';
import { ExpRate } from './ExpRate'

export function ExpBooking({ exp, onBookClick,onNumOfGuestsChange, numOfGuests }) {
    return (
        <section className="exp-booking">
            <div className="flex space-between">
                <span className="price">${exp.price}  <span >/ Person &nbsp;</span></span>
                <ExpRate reviews={exp.reviews} />
            </div>
            <div className="exp-date">{new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toDateString()}</div>
            <div>
                <label htmlFor="number-of-guests-booking">Number of guests:</label>
                <input type="number" name="numOfGuests" value={numOfGuests} onChange={onNumOfGuestsChange} min="1" max={exp.capacity.max} id="number-of-guests-booking"/>
            </div>
            <button onClick={onBookClick}>Book!</button>
        </section>
    )
}

