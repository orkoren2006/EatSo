import React from 'react'
import { Link } from 'react-router-dom';
import { ExpRate } from './ExpRate';
import { Image, Transformation } from 'cloudinary-react';



export function HostList(props) {
    const { exps, host } = props
    const firstName = host.fullName;
    const i = firstName.indexOf(" ");
    return (
        <React.Fragment>

            <section className="width-1366">

                <div className="host-title flex justify-start">
                    <Image className="host-preview-avatar" cloudName="orkofy" publicId={host.imgUrl} type="fetch">
                        <Transformation width="200" height="200" gravity="face" radius="max" crop="thumb" />
                    </Image>
                    <h2>{host.fullName}</h2>

                </div>

                <div className="host-description">
                    <p>{host.desc}</p>
                </div>
                <h3>{firstName.substring(0, i)}'s experiences </h3>
                <div className="host-exps card-grid">
                    {exps.map(exp => {
                        return (
                            <Link key={exp._id} to={`/exp/${exp._id}`}>
                                <section className="exp-card-cont flex">
                                    <img className="img-in-div" src={exp.imgUrls[0]}></img>
                                    <div className="div-in-image"><ExpRate reviews={exp.reviews} /></div>
                                </section>
                                <section className="exp-card-desc">
                                    <p><span>Experience </span>in {exp.location.city}</p>   
                                    {/* replace the word 'dinner' with a varaible */}
                                    {/* <h5><span>Experience </span>in {exp.location.city}</h5>   
                                    replace the word 'dinner' with a varaible */}
                                    <h3>{exp.name}</h3>
                                    <h4>{exp.title}</h4>
                                    {/* <ExpRate reviews={exp.reviews} /> */}
                                </section>
                            </Link>
                        )
                    })}
                </div>

            </section>
        </React.Fragment>
    )
}

