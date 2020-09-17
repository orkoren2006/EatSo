import React, { Component } from 'react'
import { connect } from 'react-redux';
import { GoogleMap } from '../cmps/GoogleMap';
import { expService } from '../services/expService';

class _ExpDetails extends Component {

    state = {
        exp: null
    }

    async componentDidMount() {
        const id = this.props.match.params.id;
        const exp = await expService.getById(id);
        if (!exp) return;
        this.setState({ exp })
    }


    render() {
        const { exp } = this.state;
        if (!exp) return <div> </div>
        const center = { lat: exp.location.lat, lng: exp.location.lng }
        return (
            <div className="exp-details-container">
                <section className="exp-imgs">
                    {
                        exp.imgUrls.map((imgUrl, idx) => <img key={`img-${idx}-${exp._id}`} src={imgUrl} alt="img" />)
                    }
                </section>

                <section className="exp-content">
                    <section className="exp-details">
                        <h6>{exp.location.city} &gt; </h6>
                        <h1>{exp.name}</h1>
                        <h3>{exp.title}</h3>
                        <h6>Hosted by {exp.owner.fullName}</h6>
                        <h5>A word about the experience</h5>
                        <p>{exp.desc}</p>
                    </section>
                    <section className="exp-booking">
                        <span> Price: ${exp.price}</span>
                        <button>Book!</button>
                    </section>
                </section>
                <GoogleMap style={{ width: '80%', height: 350 }} center={center} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {

    };
};
const mapDispatchToProps = {

};

export const ExpDetails = connect(mapStateToProps, mapDispatchToProps)(_ExpDetails);