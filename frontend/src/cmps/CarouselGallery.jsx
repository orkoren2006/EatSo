import React, { Component } from 'react'
import ImageGallery from 'react-image-gallery';



export class CarouselGallery extends Component {
    state = {
        images: null
    }
    componentDidMount() {
        const images = this.props.images.map(img => ({ original: img, thumbnail: img }));
        this.setState({ images });
    }


    render() {
        const { images } = this.state;
        const { startIdx } = this.props;
        if (!images) return <div></div>
        return <ImageGallery items={images} startIndex={startIdx} />;
    }
}