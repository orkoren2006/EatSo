import React from 'react'
import { GoogleApiWrapper, Map, Marker, InfoWindow } from 'google-maps-react';


class _GoogleMap extends React.Component {

    state = {
        lat: 30.0853,
        lng: 30.7818
    }
    componentDidMount() {
        const { lat, lng } = this.props.center;
        this.setState({ lat, lng })
    }

    onMarkerClick = (props, marker, event) => {

    }

    onMapClicked = (mapProps, map, ev) => {
        this.setState({ lat: ev.latLng.lat(), lng: ev.latLng.lng() })
    }

    render() {
        return (
            <Map initialCenter={this.state} style={this.props.style} containerStyle={this.props.containerStyle} center={this.state} onClick={this.onMapClicked} google={this.props.google} zoom={18}>
                <Marker position={this.state} name={'Current location'} />
            </Map>
        );
    }
}

export const GoogleMap = GoogleApiWrapper({
    apiKey: ('AIzaSyCnrcFHEWtsdej9RrPgjrCeYLtfP6CJhgA')
})(_GoogleMap)