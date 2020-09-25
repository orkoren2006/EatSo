import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export function ExpRateBig(props) {
    const { reviews } = props;

    function getAvgRate() {
        if(!reviews.length) return 0;
        const sum = reviews.reduce((acc, review) => acc += review.rate, 0)
        return (sum / reviews.length).toFixed(1);
    }

    function getNumOfReviews() {
        return reviews.length;
    }

    return (
        <div className="exp-rate-big">
            <FontAwesomeIcon className="star-icon" icon={faStar} />&nbsp;
            {getAvgRate()} ({getNumOfReviews()} Reviews)
        </div>

    )
}
