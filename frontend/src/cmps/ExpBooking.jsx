import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadBookings } from '../store/actions/bookingAction';
import { ExpRate } from './ExpRate'


function _ExpBooking({ exp, onBookClick, onNumOfGuestsChange, numOfGuests, bookings, user, ...props }) {
    const isAlreadyBooked = user && bookings.find(booking => booking.guest._id === user._id && booking.exp.schedule.at > Date.now() && booking.exp._id === exp._id)
    const className = isAlreadyBooked ? 'disable' : ''
    const txtBtn = isAlreadyBooked ? 'You\'re already booked to this experience' : 'Save your table now';

    return ((!user || (user && exp.owner._id !== user._id)) && (
        (!isAlreadyBooked &&
            <section className="exp-booking">
                <div className="flex space-between">
                    <span className="price">${exp.price}  <span >/ Person &nbsp;</span></span>
                    <ExpRate reviews={exp.reviews} />
                </div>
                <div className="exp-date">{new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toDateString()}</div>
                <div>
                    <label htmlFor="number-of-guests-booking">Number of guests:</label>
                    <input type="number" name="numOfGuests" value={numOfGuests} onChange={onNumOfGuestsChange} min="1" max={exp.capacity.max} id="number-of-guests-booking" />
                </div>
                <button disabled={isAlreadyBooked} className={className} onClick={onBookClick}>{txtBtn}</button>
            </section>)
        || (isAlreadyBooked &&
            <section className="exp-booking">
                <div className="already-booked-txt" >{txtBtn}</div>
                
                <div className="exp-date">On {new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toDateString()}</div>

                <Link to="/myexp/participants"><button>Modify your booking</button></Link>
            </section>)
    ))
}

const mapStateToProps = state => {
    return {
        user: state.user.loggedInUser,
        bookings: state.booking.bookings
    };
};

const mapDispatchToProps = {
    loadBookings
};

export const ExpBooking = connect(mapStateToProps, mapDispatchToProps)(_ExpBooking);

