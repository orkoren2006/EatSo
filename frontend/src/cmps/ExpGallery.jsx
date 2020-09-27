import React from 'react'

export function ExpGallery({ imgUrls, onImgClick }) {
    return (
        <section className="exp-gallery">
            {
                imgUrls.map((imgUrl, idx) => <div key={`img-${idx}`} className="exp-img"><img  src={imgUrl} alt="img" onClick={()=>onImgClick(idx)}/></div>)
            }
        </section>
    )
}
