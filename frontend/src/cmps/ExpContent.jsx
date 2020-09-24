import React from 'react'
import { Link } from 'react-router-dom'
import { ExpBooking } from './ExpBooking'
import { ExpParticipantsList } from './ExpParticipantsList'
import { Menu } from './Menu'
import { ReviewEdit } from './ReviewEdit'
import { ReviewList } from './ReviewList'

export default function ExpContent({ exp, numOfGuests ,onNumOfGuestsChange, toggleAddReviewShown, onHandleChange, onAddReview, review, onBookClick, isAddReviewShown }) {
    return (      
        <section className="exp-content">
            <div className="exp-details">
                <section >
                    <ExpParticipantsList participants={exp.participants}/>
                    <h6>{exp.location.city} &gt; </h6>
                    <h3>{exp.title}</h3>
                    <h6>Hosted by <Link className="owner" to={`exp/owner._id/${exp.owner._id}`}>{exp.owner.fullName}</Link></h6>
                    <h5>A word about the experience</h5>
                    <p>{exp.desc}</p>
                    <Menu menu={exp.menu} />
                    <hr />
                </section>

                <section className="exp-reviews">
                    <button onClick={toggleAddReviewShown}>Add review</button>
                    <ReviewList reviews={exp.reviews} />
                    {isAddReviewShown && <ReviewEdit onHandleChange={onHandleChange} onAddReview={onAddReview} review={review} />}
                </section>
            </div>
            <ExpBooking exp={exp} onBookClick={onBookClick} numOfGuests={numOfGuests} onNumOfGuestsChange={onNumOfGuestsChange} />
        </section>
    )
}
