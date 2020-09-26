import React from 'react'
import { Link, withRouter } from 'react-router-dom';

// function _HomeCard({ propsObj, cardIdx }) {
function _HomeCard(props) {

    function onCardClick(filterBy) {
        const key = Object.keys(filterBy)[0]
        const value = Object.values(filterBy)[0]
        // console.log(props.);
        props.history.push(`/exp?${key}=${value}`)
    }

    // building filter for url
    const field = Object.keys(props.propsObj.filterBy)[0];
    const value = Object.values(props.propsObj.filterBy)[0];


    return (
        <div onClick={() => onCardClick({ [field]: value })}
            className={`home-card home-card-${(props.cardIdx === 0) ? 1 : 2}`}>
            <div className={`preview-image img-${props.cardIdx + 1} flex column align-start justify-start`}>
                <h3>{props.propsObj.title}</h3><h4>{props.propsObj.subtitle}</h4></div>
        </div>
    )
}

export const HomeCard = withRouter(_HomeCard)
