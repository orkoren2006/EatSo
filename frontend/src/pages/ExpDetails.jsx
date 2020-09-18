import React, { Component } from 'react'
import { connect } from 'react-redux';
import { GoogleMap } from '../cmps/GoogleMap';
import { expService } from '../services/expService';
import { Menu } from '../cmps/Menu';
import { Modal } from '../cmps/Modal';
import { ExpRate } from '../cmps/ExpRate';
import { Link } from 'react-router-dom'
class _ExpDetails extends Component {

    state = {
        exp: null,
        isModalShown: false
    }

    async componentDidMount() {
        const id = this.props.match.params.id;
        const exp = await expService.getById(id);
        if (!exp) return;
        this.setState({ exp })
    }

    get avgRate() {
        const exp = this.state.exp;
        const sum = exp.reviews.reduce((acc, review) => acc += review.rate, 0)
        return (sum / exp.reviews.length).toFixed(1);
    }

    get numOfReviews() {
        return this.state.exp.reviews.length;
    }

    onBookClick = () => {
        this.setState({ isModalShown: true })
    }

    onCloseModal = () => {
        this.setState({ isModalShown: false })
    }
    render() {
        const { exp, isModalShown } = this.state;
        if (!exp) return <div>  </div>
        const center = { lat: exp.location.lat, lng: exp.location.lng }
        return (
            <div className="exp-details-container">
                <Modal onCloseModal={this.onCloseModal} isShown={isModalShown}>
                    <p>Lop</p>
                </Modal>
                <h2>{exp.name}</h2>
                <ExpRate avgRate={this.avgRate} numOfRates={this.numOfReviews} />
                <section className="exp-imgs">
                    {
                        exp.imgUrls.map((imgUrl, idx) => <img key={`img-${idx}-${exp._id}`} src={imgUrl} alt="img" />)
                    }
                </section>

                <section className="exp-content">
                    <section className="exp-details">
                        <h6>{exp.location.city} &gt; </h6>

                        <h3>{exp.title}</h3>
                        <h6>Hosted by <Link className="owner" to={`/host/${exp.owner._id}`}>{exp.owner.fullName}</Link></h6>
                        <h5>A word about the experience</h5>
                        <p>{exp.desc}</p>
                        <Menu menu={exp.menu} />

                    </section>
                    <section className="exp-booking">
                        <div className="flex space-between">
                            <span className="price">${exp.price}  <span >/ Person &nbsp;</span></span>
                            <ExpRate avgRate={this.avgRate} numOfRates={this.numOfReviews} />
                        </div>
                        <div className="exp-date">{new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toDateString()}</div>
                        <button onClick={this.onBookClick}>Book!</button>
                    </section>
                </section>
                <GoogleMap containerStyle={{ width: '50%', height: 150 }} style={{ width: '50%', height: 150 }} center={center} />
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