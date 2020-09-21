import React from 'react'
import { Link } from 'react-router-dom';
import { ExpRate } from './ExpRate';
import { Image, Transformation } from 'cloudinary-react';



export function HostList(props) {
    const { exp, host } = props
    return (
        <React.Fragment>
            <section className="width-1366">
                <Image className="preview-avatar" cloudName="orkofy" publicId={host.imgUrl} type="fetch">
                    <Transformation width="200" height="200" gravity="face" radius="max" crop="thumb" />
                </Image>
                <h2>{host.fullName}</h2>
                <p>{host.desc}</p>

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
                            <ExpRate reviews={exp.reviews} />
                            {/* <FontAwesomeIcon className="star-icon" icon={faStar} /> */}
                        </section>
                    </Link>
                </div>
            </section>
        </React.Fragment>
    )
}

