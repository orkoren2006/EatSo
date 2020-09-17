import React from 'react'
import { Link } from 'react-router-dom';


export function ExpPreview(props) {
    const { exp } = props
    return (
        <div className="exp-card">
            <Link to={`/exp/${exp._id}`}>
                <section className="cont flex">
                    <img className="img-in-div" src={exp.imgUrls[0]}></img>
                    <div className="div-in-image">${exp.price}</div>
                </section>
                <section className="desc">
                <p><span>Dinner </span>in {exp.location.city}</p>   {/* replace the word 'dinner' with a varaible */}
                <h3>{exp.name}</h3>
                <p>{exp.reviews[0].rate}/5</p>
                </section>
            </Link>
        </div>
    )
}
