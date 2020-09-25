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
                    {/* <div className="div-in-image">${exp.price}</div> */}
                    <div className="price-in-image"><ExpRate reviews={exp.reviews} /></div>
                </section>
                <section className="exp-card-desc">
                    <div className="flex space-between">
                    <p><span>Dinner </span>in {exp.location.city}</p>   {/* replace the word 'dinner' with a varaible */}
                    <h5>${exp.price}</h5>
                    </div>
                    <h3>{exp.name}</h3>
                    <h4>{exp.title}</h4>
                    

                </section>
            </Link>
            <section className="host-preview flex align-end">
                <Image className="preview-avatar" cloudName="orkofy" publicId={exp.owner.imgUrl} type="fetch">
                    <Transformation width="200" height="200" gravity="face" radius="max" crop="thumb" />
                </Image>

                
                    <p>Hosted by <Link to={`/exp/owner._id/${exp.owner._id}`}><span>{exp.owner.fullName}</span></Link></p>&nbsp;
                
            </section>

            {props.isHost &&
                <Link to={`/exp/edit/${exp._id}`}><Button variant="contained" color="primary">
                    Edit</Button></Link>}
        </div>
    )
}
