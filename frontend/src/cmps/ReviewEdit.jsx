import React from 'react'
import { Rating } from '@material-ui/lab';
import { withStyles } from '@material-ui/core/styles';
import { Image, Transformation } from 'cloudinary-react';

export function ReviewEdit({ review, onHandleChange, onAddReview, user }) {
    return (
        <div>
            <form onSubmit={onAddReview}>

                {/* <input autoComplete="off" name="txt" onChange={onHandleChange} value={review.txt} type="text" /> */}
                <div className="add-review-text">
                    <textarea className="message-input" onChange={onHandleChange} value={review.txt}
                        rows="5" cols="60" name="txt" form="usrform"></textarea>

                </div>
                <div className="add-review-text flex space-between">
                    <Image className="preview-avatar" cloudName="orkofy" publicId={!user ? `https://res.cloudinary.com/orkofy/image/upload/v1600666498/eatso-profile/user_bqaypc.jpg` : user.imgUrl} type="fetch">
                        <Transformation width="200" height="200" gravity="face" radius="max" crop="thumb" />
                    </Image>
                    <StyledRating defaultValue={1} name="rate" onChange={onHandleChange} value={review.rate} />
                    <button>Send</button>
                </div>

            </form>
        </div>
    )
}

const StyledRating = withStyles({ iconFilled: { color: '#fd7854' } })(Rating);