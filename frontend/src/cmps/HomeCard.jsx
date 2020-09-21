import React from 'react'
import { Link } from 'react-router-dom';

export function HomeCard({ propsObj, cardIdx }) {

    // building filter for url
    const filterBy = {};
    filterBy.field = Object.keys(propsObj.filterBy)[0];
    filterBy.keyWord = Object.values(propsObj.filterBy)[0];

    return (
        <div className={`home-card home-card-${(cardIdx === 0) ? 1 : 2}`}>
            <Link to={`/exp/${filterBy.field}/${filterBy.keyWord}`}><div className={`preview-image img-${cardIdx + 1} flex column align-start justify-start`}>
                <h3>{propsObj.title}</h3><h4>{propsObj.subtitle}</h4></div></Link>
        </div>
    )
}
