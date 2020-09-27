import React, { Component } from 'react'
import ImageGallery from 'react-image-gallery';



export class CarouselGallery extends Component {
    state = {
        images: null
    }
    componentDidMount() {
        const { startIdx } = this.props;
        const images = this.props.images.map(img => ({ original: img, thumbnail: img }));
        var temp = images[0];
        images[0] = images[startIdx];
        images[startIdx] = temp;
        this.setState({ images });
    }

    render() {
        const { images } = this.state;
        if (!images) return <div></div>
        return <ImageGallery items={images} />;
    }
}