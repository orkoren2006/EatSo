import React from 'react'
import { Link } from 'react-router-dom'
import { ExpBooking } from './ExpBooking'
import { ExpParticipantsList } from './ExpParticipantsList'
import { Menu } from './Menu'
import { ReviewEdit } from './ReviewEdit'
import { ReviewList } from './ReviewList'
import { Image, Transformation } from 'cloudinary-react';

export default function ExpContent({ user, exp, numOfGuests, onNumOfGuestsChange, toggleAddReviewShown, onHandleChange, onAddReview, review, onBookClick, isAddReviewShown }) {
    return (
        <section className="exp-content">
            <ExpBooking exp={exp} onBookClick={onBookClick} numOfGuests={numOfGuests} onNumOfGuestsChange={onNumOfGuestsChange} />
        </section>
    )
}
