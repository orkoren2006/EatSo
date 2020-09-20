import React from 'react'
import { ReviewPreview } from './ReviewPreview'

export function ReviewList({ reviews }) {
    return (
        <div>
            <h4>Reviews</h4>
            {
                reviews.map((review, idx) => <ReviewPreview key={`review-${idx}`} review={review} />)
            }
        </div>
    )
}
