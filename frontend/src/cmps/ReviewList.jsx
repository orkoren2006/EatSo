import React from 'react'
import { ReviewPreview } from './ReviewPreview'

export function ReviewList({ reviews }) {
    return (
        <div>
            <div className="review-list">
                {
                    reviews.map((review, idx) => <ReviewPreview key={`review-${idx}`} review={review} />)
                }
            </div>
        </div>
    )
}
