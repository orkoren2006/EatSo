import React, { Component } from 'react'
import { connect } from 'react-redux';

import { GoogleMap } from '../cmps/GoogleMap';
import { ExpDetailsTab } from '../cmps/ExpDetailsTab';
import { expService } from '../services/expService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMale, faFemale, faClock, faCalendarAlt, faWheelchair } from '@fortawesome/free-solid-svg-icons';

import { Modal } from '../cmps/Modal';
import { ExpRate } from '../cmps/ExpRate';
import { LoginSignup } from './LoginSignup';
import { utilService } from '../services/utilService';
import { loadExps, saveExp } from '../store/actions/expAction';
import { ExpGallery } from '../cmps/ExpGallery';
// import ExpContent from '../cmps/ExpContent';
import { ExpChat } from '../cmps/ExpChat';
import { bookingService } from '../services/bookingService';
import { loadBookings, saveBooking } from '../store/actions/bookingAction';
import { socketService } from '../services/socketService';
import { Image, Transformation } from 'cloudinary-react';
import { Link } from 'react-router-dom';
import { CarouselGallery } from '../cmps/CarouselGallery';
import { ExpBooking } from '../cmps/ExpBooking';
import { ExpParticipantsList } from '../cmps/ExpParticipantsList';
import { ReviewList } from '../cmps/ReviewList';
import { ReviewEdit } from '../cmps/ReviewEdit';
import { ExpRateBig } from '../cmps/ExpRateBig';
import { Menu } from '../cmps/Menu';
// import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';


const ObjectId = require('mongodb').ObjectId

class _ExpDetails extends Component {

    state = {
        exp: null,
        isModalShown: false,
        // isChat: false,
        isAddReviewShown: false,
        review: {
            id: utilService.makeId(),
            txt: '',
            rate: 5
        },
        numOfGuests: 1,
        login: false,
        gallery: {
            isShown: false,
            idx: -1
        }

    }
    async componentDidMount() {
        const id = this.props.match.params.id;
        const exp = await expService.getById(id);
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

    onImgClick = (idx) => {
        this.setState({ login: false, gallery: { idx, isShown: true } })
        this.onShowModal();
    }

    onBookClick = async () => {
        if (!this.props.user) {
            this.setState({ login: true, gallery: { ...this.state.gallery, isShown: false } })
            return this.onShowModal();
        }
        const { exp } = this.state;
        const { user } = this.props;
        const booking = await bookingService.getEmpty();
        booking.guest = {
            _id: ObjectId(user._id),
            fullName: user.fullName,
            imgUrl: user.imgUrl
        };
        booking.numOfGuests = this.state.numOfGuests;
        booking.exp = {
            _id: ObjectId(exp._id),
            schedule: exp.schedule,
            owner: exp.owner,
            name: exp.name
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
        console.log('im so happy');
        this.setState({ [key]: value });
    }

    onAddReview = (ev) => {
        ev.preventDefault();
        if (!this.props.user) {
            this.setState({ login: true, gallery: { ...this.state.gallery, isShown: false } })
            return this.onShowModal();
        }
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
        const { exp, review, isModalShown, isAddReviewShown, numOfGuests, login, gallery } = this.state;
        const { user } = this.props;
        if (!exp) return <div>  </div>
        const center = { lat: exp.location.lat, lng: exp.location.lng }
        return (
            <div className="exp-details-container main-container">
                <Modal onCloseModal={this.onCloseModal} isShown={isModalShown} >
                    {login && <LoginSignup onCloseModal={this.onCloseModal} />}
                    {gallery.isShown && <CarouselGallery images={exp.imgUrls} startIdx={gallery.idx} />}
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
                <div className="carousel-gallery">
                    <CarouselGallery images={exp.imgUrls} startIdx={0} />
                </div>
                <div className="simple-gallery">
                    <ExpGallery imgUrls={exp.imgUrls} onImgClick={this.onImgClick} />
                </div>
                <section className="flex exp-details-content">
                    <div className="flex column flex-2 exp-opening">
                        <div className="exp-details-host-avatar align-center flex space-between ">
                            <div>
                                <Image className="preview-avatar" cloudName="orkofy" publicId={exp.owner.imgUrl} type="fetch">
                                    <Transformation width="200" height="200" gravity="face" radius="max" crop="thumb" />
                                </Image>
                                <h6>Hosted by <Link className="owner" to={`/host/${exp.owner._id}`}>{exp.owner.fullName}</Link></h6>
                            </div>

                            <section className="grid-icons exps-icons">
                                <div className="flex column align-center">
                                    <div className="flex">
                                        <FontAwesomeIcon className="male-icon" icon={faMale} />
                                        <FontAwesomeIcon className="female-icon" icon={faFemale} />
                                    </div>
                                    <p>{exp.capacity.min}-{exp.capacity.max}</p>
                                </div>
                                <div className="flex column align-center">
                                    <FontAwesomeIcon className="clock-icon" icon={faClock} />
                                    <p>7pm-9pm</p>
                                </div>
                                <div className="flex column align-center">
                                    <FontAwesomeIcon className="calendar-icon" icon={faCalendarAlt} />
                                    <p>{new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toDateString()}</p>
                                </div>
                                <div className="flex column align-center">
                                    <FontAwesomeIcon className="wheelchair-icon" icon={faWheelchair} />
                                    <p>Accesible</p>
                                </div>
                            </section>
                        </div>

                        <h3>{exp.title}</h3>


                        <p>{exp.desc}</p>
                        <div className="tab-details">
                            <ExpDetailsTab user={user} exp={exp} review={review} toggleAddReviewShown={this.toggleAddReviewShown}
                                onHandleChange={this.onHandleChange} onAddReview={this.onAddReview} numOfGuests={numOfGuests}
                                isAddReviewShown={isAddReviewShown} onBookClick={this.onBookClick} onNumOfGuestsChange={this.onNumOfGuestsChange} />
                        </div>
                        <div className="list-details">
                            <div>
                                <h3>Menu</h3>
                                <Menu menu={exp.menu} />
                            </div>
                            <section className="exp-reviews flex column">
                                <h3>Reviews</h3>
                                <div className="flex space-between">
                                    <ExpRateBig reviews={exp.reviews} />
                                    <button onClick={this.toggleAddReviewShown}>Add review</button>
                                </div>
                                {isAddReviewShown && <ReviewEdit onHandleChange={this.onHandleChange} onAddReview={this.onAddReview} review={review} user={user} />}
                                <ReviewList reviews={exp.reviews} />
                            </section>
                            <div>
                                <h3>Participants</h3>
                                <ExpParticipantsList participants={exp.participants} />
                            </div>
                        </div>

                    </div>

                    <section className="exp-content">
                        <ExpBooking exp={exp} onBookClick={this.onBookClick} numOfGuests={numOfGuests} onNumOfGuestsChange={this.onNumOfGuestsChange} />
                    </section>

                </section>
                <section className="details-footer flex space-between">
                    <div className="google-maps">
                        {/* <GoogleMap containerStyle={{ width: '0', height: 0 }} style={{ height: 350 }} center={center} /> */}
                    </div>
                    <section className="chat-sec flex column space-between">
                        {user &&
                            <ExpChat username={user.username} expId={exp._id} />}
                    </section>
                </section>
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

