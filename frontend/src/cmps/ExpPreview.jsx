import React from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { ExpRate } from './ExpRate';
import { Image, Transformation } from 'cloudinary-react';
import { Button } from '@material-ui/core';



export function ExpPreview(props) {
    const { exp } = props

    return (
        <div className="exp-card">
            <Link to={`/exp/${exp._id}`}>
                <section className="exp-card-cont flex">
                    <Image className="img-in-div" cloudName="orkofy" publicId={exp.imgUrls[0]} type="fetch">
                    </Image>
                    <div className="div-in-image">${exp.price}</div>
                </section>
                <section className="exp-card-desc">
                    <p><span>Dinner </span>in {exp.location.city}</p>   {/* replace the word 'dinner' with a varaible */}
                    <h3>{exp.name}</h3>
                    <ExpRate reviews={exp.reviews} />

                </section>
            </Link>
            <Link to={`/host/${exp.owner._id}`}>
                <section className="host-preview">
                    <p>Hosted by <span>{exp.owner.fullName}</span></p>&nbsp;
                    <Image className="preview-avatar" cloudName="orkofy" publicId={exp.owner.imgUrl} type="fetch">
                        <Transformation width="200" height="200" gravity="face" radius="max" crop="thumb" />
                    </Image>
                </section>
            </Link>
            {props.isHost &&
                <Link to={`/exp/edit/${exp._id}`}><Button variant="contained" color="primary">
                    Edit</Button></Link>}
        </div>
    )
}
