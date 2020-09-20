import React from 'react'
import { Link } from 'react-router-dom'
import { ExpBooking } from './ExpBooking'
import { Menu } from './Menu'
import { ReviewEdit } from './ReviewEdit'
import { ReviewList } from './ReviewList'

export default function ExpContent({ exp, toggleAddReviewShown, onHandleChange, onAddReview, review, onBookClick, isAddReviewShown }) {
    return (
        <section className="exp-content">
            <div className="exp-details">
                <section >
                    <h6>{exp.location.city} &gt; </h6>

                    <h3>{exp.title}</h3>
                    <h6>Hosted by <Link className="owner" to={`/host/${exp.owner._id}`}>{exp.owner.fullName}</Link></h6>
                    <h5>A word about the experience</h5>
                    <p>{exp.desc}</p>
                    <Menu menu={exp.menu} />
                    <hr />
                </section>

                <section className="exp-reviews">
                    <ReviewList reviews={exp.reviews} />
                    <button onClick={toggleAddReviewShown}>Add review</button>
                    {isAddReviewShown && <ReviewEdit onHandleChange={onHandleChange} onAddReview={onAddReview} review={review} />}
                </section>
            </div>
            <ExpBooking exp={exp} onBookClick={onBookClick} />
        </section>
    )
}
