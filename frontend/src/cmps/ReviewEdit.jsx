import React from 'react'
import { Rating } from '@material-ui/lab';
import { withStyles } from '@material-ui/core/styles';

export function ReviewEdit({review, onHandleChange, onAddReview}) {
    return (
        <div>
            <form onSubmit={onAddReview}>
                <input autoComplete="off" name="txt" onChange={onHandleChange} value={review.txt} type="text" />
                <StyledRating defaultValue={1} name="rate" onChange={onHandleChange} value={review.rate} />
                <button>Send</button>
            </form>
        </div>
    )
}

const StyledRating = withStyles({ iconFilled: { color: '#fd7854' } })(Rating);