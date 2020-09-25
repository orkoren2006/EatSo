import React, { Component } from 'react'
import { connect } from 'react-redux';

import { GoogleMap } from '../cmps/GoogleMap';
import { expService } from '../services/expService';

import { Modal } from '../cmps/Modal';
import { ExpRate } from '../cmps/ExpRate';
import { LoginSignup } from './LoginSignup';
import { utilService } from '../services/utilService';
import { loadExps, saveExp } from '../store/actions/expAction';
import { ExpGallery } from '../cmps/ExpGallery';
import ExpContent from '../cmps/ExpContent';
import { ExpChat } from '../cmps/ExpChat';
import bookingService from '../services/bookingService';
import { loadBookings, saveBooking } from '../store/actions/bookingAction';
import { socketService } from '../services/socketService';
import { Image, Transformation } from 'cloudinary-react';
import { Link } from 'react-router-dom';

class _ExpDetails extends Component {

    state = {
        exp: null,
        isModalShown: false,
        isAddReviewShown: false,
        review: {
            id: utilService.makeId(),
            txt: '',
            rate: 5
        },
        numOfGuests: 1
    }
    async componentDidMount() {
        const id = this.props.match.params.id;
        const exp = await expService.getExpById(id);
        if (!exp) return;
        this.setState({ exp })
        if (!this.props.exps) await this.props.loadExps();
        if (!this.props.bookings.length) await this.props.loadBookings();
        // socketService.setup();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state !== prevState) {

        }
    }

    componentWillUnmount() {

        // socketService.terminate();
    }

    onBookClick = async () => {
        if (!this.props.user) return this.onShowModal();
        const { exp } = this.state;
        const { user } = this.props;
        const booking = await bookingService.getEmpty();
        booking.guest = {
            _id: user._id,
            fullName: user.fullName,
            imgUrl: user.imgUrl
        };
        booking.numOfGuests = this.state.numOfGuests;
        booking.exp = {
            _id: exp._id,
            schedule: exp.schedule
        };
        booking.status = 'pending';
        await this.props.saveBooking(booking);
        // TODO: booked successfully, please wait to host for approving
        // DONE? make sense?: re-render the exp-booking section
        await this.props.loadBookings();
        socketService.emit('booking exp', { booking, ownerId: exp.owner._id })
    }

    onCloseModal = () => {
        this.setState({ isModalShown: false })
    }

    onShowModal = () => {
        this.setState({ isModalShown: true })
    }

    toggleAddReviewShown = () => {
        this.setState({ isAddReviewShown: !this.state.isAddReviewShown })
    }

    onHandleChange = (ev) => {
        const key = ev.target.name;
        const value = (ev.target.type === 'number' || ev.target.type === 'radio') ? +ev.target.value : ev.target.value;
        this.setState({ review: { ...this.state.review, [key]: value } });// , () => console.log(this.state.review))
    }

    onNumOfGuestsChange = (ev) => {
        const key = ev.target.name;
        const value = +ev.target.value;
        this.setState({ [key]: value });
    }

    onAddReview = (ev) => {
        ev.preventDefault();
        if (!this.props.user) return this.onShowModal();
        const reviewToAdd = this.state.review;
        const { user } = this.props;

        reviewToAdd.by = {
            _id: user._id,
            fullName: user.fullName,
            imgUrl: user.imgUrl
        }
        reviewToAdd.createdAt = Date.now();

        const { exp } = this.state;
        exp.reviews = [reviewToAdd, ...exp.reviews];
        this.setState({ exp, review: { ...this.state.review, id: utilService.makeId(), txt: '' } })
        this.props.saveExp(exp);
        this.toggleAddReviewShown();
    }

    render() {
        const { exp, review, isModalShown, isAddReviewShown, numOfGuests } = this.state;
        const { user } = this.props;
        if (!exp) return <div>  </div>
        const center = { lat: exp.location.lat, lng: exp.location.lng }
        return (
            <div className="exp-details-container main-container">
                <Modal onCloseModal={this.onCloseModal} isShown={isModalShown} >
                    {<LoginSignup onCloseModal={this.onCloseModal} />}
                </Modal>
                <div className="exp-title flex column">
                    <div className="exp-title-name">
                        <h2>{exp.name}</h2>
                    </div>
                    <div className="exp-title-location flex align-base">
                        <ExpRate reviews={exp.reviews} />
                        <h6>{exp.location.city} &gt; </h6>
                    </div>
                </div>

                <ExpGallery imgUrls={exp.imgUrls} />
                <ExpContent user={user} exp={exp} review={review} toggleAddReviewShown={this.toggleAddReviewShown}
                    onHandleChange={this.onHandleChange} onAddReview={this.onAddReview} numOfGuests={numOfGuests}
                    isAddReviewShown={isAddReviewShown} onBookClick={this.onBookClick} onNumOfGuestsChange={this.onNumOfGuestsChange} />
                <div className="google-maps flex space-between">
                    <GoogleMap containerStyle={{ width: '40%', height: 350 }} style={{ height: 350 }} center={center} />
                    {user && <ExpChat username={user.username} expId={exp._id} />}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.loggedInUser,
        exps: state.exp.exps,
        bookings: state.booking.bookings
    };
};

const mapDispatchToProps = {
    saveExp,
    loadExps,
    saveBooking,
    loadBookings
};

export const ExpDetails = connect(mapStateToProps, mapDispatchToProps)(_ExpDetails);

