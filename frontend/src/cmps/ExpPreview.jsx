import React from 'react'
import { Link } from 'react-router-dom';


export function ExpPreview (props) {
    const { exp } = props
        return (
            <div className="exp-card">
                <Link to={`/exp/${exp._id}`}>
                <img src={exp.imgUrls[0]}></img>
                <p><span>Dinner </span>in {exp.location.city}</p>   {/* replace the word 'dinner' with a varaible */}
                <h3>{exp.name}</h3>
                <p>{exp.reviews[0].rate}/5</p>
                </Link>
            </div>
        )
    }
