import React from 'react';
import { Image, Transformation } from 'cloudinary-react';
import { Link } from 'react-router-dom';


export function UserPreview({ user, date }) {
    console.log(user.imgUrl);
    return (
        <div className="user-preview-container">
            <Link to={`/host/${user._id}`}>
                <section className="user-preview">
                    <Image className="preview-avatar" cloudName="orkofy" publicId={user.imgUrl} type="fetch">
                        <Transformation width="200" height="200" gravity="face" radius="max" crop="thumb" />
                    </Image>
                    <div className="user-name">{user.fullName}</div>
                    <div className="user-date">{new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toDateString()}</div>
                </section>
            </Link>
        </div>
    )
}
