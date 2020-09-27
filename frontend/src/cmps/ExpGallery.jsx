import React from 'react'

export function ExpGallery({ imgUrls, onImgClick }) {
    return (
        <section className="exp-gallery">
            {
                imgUrls.map((imgUrl, idx) => <img key={`img-${idx}`} src={imgUrl} alt="img" onClick={()=>onImgClick(idx)} />)
            }
        </section>
    )
}
