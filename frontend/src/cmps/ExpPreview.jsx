import React from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { ExpRate } from './ExpRate';


export function ExpPreview(props) {
    const { exp } = props
    return (
        <div className="exp-card">
            <Link to={`/exp/${exp._id}`}>
                <section className="exp-card-cont flex">
                    <img className="img-in-div" src={exp.imgUrls[0]}></img>
                    {/* <img className="img-in-div-2" src={exp.imgUrls[1]}></img> */}
                    <div className="div-in-image">${exp.price}</div>
                </section>
                <section className="exp-card-desc">
                    <p><span>Dinner </span>in {exp.location.city}</p>   {/* replace the word 'dinner' with a varaible */}
                    <h3>{exp.name}</h3>
                    <ExpRate reviews={exp.reviews} />
                    {/* <FontAwesomeIcon className="star-icon" icon={faStar} /> */}
                </section>
            </Link>
            <Link to={`/host/${exp.owner._id}`}>
                <section className="host-preview">
                    <p>Hosted by <span>{exp.owner.fullName}</span></p>&nbsp;
                    <img className="preview-avatar" src={exp.owner.imgUrl}></img>
                </section>
            </Link>
        </div>
    )
}
