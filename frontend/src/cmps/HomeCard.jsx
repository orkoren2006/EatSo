import React from 'react'
import { Link, withRouter } from 'react-router-dom';

// function _HomeCard({ card, cardIdx }) {
function _HomeCard({ card, cardIdx, ...props }) {

    const key = Object.keys(card.filterBy)[0]
    const value = Object.values(card.filterBy)[0]

    return (
        <div onClick={() => props.history.push(`/exp?${key}=${value}`)} className="home-card">
            <div className={`preview-image img-${cardIdx + 1}`}>
                <h3>{card.title}</h3>
                <h4>{card.subtitle}</h4>
            </div>
        </div>
    )
}

export const HomeCard = withRouter(_HomeCard)
