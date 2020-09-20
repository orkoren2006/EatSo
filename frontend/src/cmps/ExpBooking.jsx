import React from 'react'
import { ExpRate } from './ExpRate'

export function ExpBooking({exp, onBookClick}) {
    return (
        <section className="exp-booking">
            <div className="flex space-between">
                <span className="price">${exp.price}  <span >/ Person &nbsp;</span></span>
                <ExpRate reviews={exp.reviews} />
            </div>
            <div className="exp-date">{new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toDateString()}</div>
            <button onClick={onBookClick}>Book!</button>
        </section>
    )
}
