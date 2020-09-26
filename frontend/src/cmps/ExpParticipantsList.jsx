import React from 'react'
import { Image, Transformation } from 'cloudinary-react';

export function ExpParticipantsList({ participants }) {
    return (
        <div className="parts-list">
            
            {/* <ul> */}
            {participants.map(part => {

                // <li key={part._id}>
                return <section key={part._id} className="host-exps flex align-center">
                    <Image className="preview-avatar" cloudName="orkofy" publicId={part.imgUrl} type="fetch">
                        <Transformation width="200" height="200" gravity="face" radius="max" crop="thumb" />
                    </Image>
                    <span>{part.fullName}</span>
                </section>
                // </li>
            })}
            {/* </ul> */}
        </div>
    )
}
