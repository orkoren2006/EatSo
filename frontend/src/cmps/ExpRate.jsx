import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export function ExpRate(props) {
    const { avgRate, numOfRates } = props;
    return (
        <div className="exp-rate">
            <FontAwesomeIcon className="star-icon" icon={faStar} />&nbsp;
            {avgRate} ({numOfRates})
        </div>

    )
}
