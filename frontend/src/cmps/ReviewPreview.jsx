import React from 'react'
import { Rating } from '@material-ui/lab';
import { withStyles } from '@material-ui/core/styles';

export function ReviewPreview({ review }) {
    return (
        <div className="review-preview">
            {review.by.fullName}:&nbsp;
            {review.txt}
            <br />
            <StyledRating value={review.rate} readOnly />
        </div>
    )
}

const StyledRating = withStyles({ iconFilled: { color: '#fd7854' } })(Rating);
