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
            <div className="exp-details">
                <section >
                    <div className="exp-details-host-avatar align-center flex ">
                        <Image className="preview-avatar" cloudName="orkofy" publicId={exp.owner.imgUrl} type="fetch">
                            <Transformation width="200" height="200" gravity="face" radius="max" crop="thumb" />
                        </Image>
                        <h6>Hosted by <Link className="owner" to={`exp/owner._id/${exp.owner._id}`}>{exp.owner.fullName}</Link></h6>
                    </div>
                    
                    <h3>{exp.title}</h3>

                    <h5>A word about the experience</h5>
                    <p>{exp.desc}</p>
                    <Menu menu={exp.menu} />
                    <hr />
                </section>

                <section className="exp-reviews">
                    <button onClick={toggleAddReviewShown}>Add review</button>
                    <ReviewList reviews={exp.reviews} />
                    {isAddReviewShown && <ReviewEdit onHandleChange={onHandleChange} onAddReview={onAddReview} review={review} user={user}/>}
                </section>
            </div>
            <section>
            <ExpBooking exp={exp} onBookClick={onBookClick} numOfGuests={numOfGuests} onNumOfGuestsChange={onNumOfGuestsChange} />
            <ExpParticipantsList participants={exp.participants} />
            </section>
        </section>
    )
}
