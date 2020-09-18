import React from 'react'
import { Link } from 'react-router-dom';


export function HostList(props) {
    const { exp } = props
    return (


        <div className="host-exps card-grid">
            <Link to={`/exp/${exp._id}`}>
                <section className="exp-card-cont flex">
                    <img className="img-in-div" src={exp.imgUrls[0]}></img>
                    {/* <img className="img-in-div-2" src={exp.imgUrls[1]}></img> */}
                    <div className="div-in-image">${exp.price}</div>
                </section>
                <section className="exp-card-desc">
                    <p><span>Dinner </span>in {exp.location.city}</p>   {/* replace the word 'dinner' with a varaible */}
                    <h3>{exp.name}</h3>
                    <p>{exp.reviews[0].rate}/5</p>
                    {/* <FontAwesomeIcon className="star-icon" icon={faStar} /> */}
                </section>
            </Link>
        </div>
    )
}

