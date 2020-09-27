import React, { Component } from 'react'
import ImageGallery from 'react-image-gallery';
 
const images = [
  {
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/1000/600/',
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/1000/600/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/1000/600/',
  },
];
 
export class CarouselGallery extends Component {
  render() {
    return <ImageGallery items={images} sizes={{maxWidth: 100}} />;
  }
}