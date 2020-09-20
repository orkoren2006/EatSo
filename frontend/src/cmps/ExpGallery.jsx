import React from 'react'

export function ExpGallery({ imgUrls }) {
    return (
        <section className="exp-gallery">
            {
                imgUrls.map((imgUrl, idx) => <img key={`img-${idx}`} src={imgUrl} alt="img" />)
            }
        </section>
    )
}
