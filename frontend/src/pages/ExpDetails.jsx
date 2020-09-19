import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { Rating } from '@material-ui/lab';
import { withStyles } from '@material-ui/core/styles';

import { GoogleMap } from '../cmps/GoogleMap';
import { expService } from '../services/expService';
import { Menu } from '../cmps/Menu';
import { Modal } from '../cmps/Modal';
import { ExpRate } from '../cmps/ExpRate';
import { LoginSignup } from './LoginSignup';
import { utilService } from '../services/utilService';
import { saveExp } from '../store/actions/expAction';
class _ExpDetails extends Component {

    state = {
        exp: null,
        isModalShown: false,
        isAddReviewShown: false,
        review: {
            id: utilService.makeId(),
            txt: '',
            rate: 5
        }
    }
    async componentDidMount() {
        const id = this.props.match.params.id;
        const exp = await expService.getById(id);
        if (!exp) return;
        this.setState({ exp })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state !== prevState) {

        }
    }


    onBookClick = () => {
        if (!this.props.user) return this.onShowMaodl();
    }

    onCloseModal = () => {
        this.setState({ isModalShown: false })
    }

    onShowMaodl = () => {
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

    onAddReview = (ev) => {
        ev.preventDefault();
        if(!this.props.user) return this.onShowMaodl();
        const reviewToAdd = this.state.review;
        const {user} = this.props;
        reviewToAdd.by = {
            _id: user._id,
            fullName: user.fullName,
            imgUrl: user.imgUrl
        }
        var exp = JSON.parse(JSON.stringify(this.state.exp));
        exp.reviews = [reviewToAdd, ...exp.reviews];
        this.setState({exp, review: {...this.state.review, id: utilService.makeId(), txt: '' } })
        this.props.saveExp(exp);
        this.toggleAddReviewShown();
    }

    render() {
        const { exp, review, isModalShown, isAddReviewShown } = this.state;
        if (!exp) return <div>  </div>
        const center = { lat: exp.location.lat, lng: exp.location.lng }
        return (
            <div className="exp-details-container">
                <Modal onCloseModal={this.onCloseModal} isShown={isModalShown}>
                    <LoginSignup />
                </Modal>
                <h2>{exp.name}</h2>
                <ExpRate reviews={exp.reviews} />
                <section className="exp-imgs">
                    {
                        exp.imgUrls.map((imgUrl, idx) => <img key={`img-${idx}-${exp._id}`} src={imgUrl} alt="img" />)
                    }
                </section>

                <section className="exp-content">
                    <div className="exp-details">
                        <section >
                            <h6>{exp.location.city} &gt; </h6>

                            <h3>{exp.title}</h3>
                            <h6>Hosted by <Link className="owner" to={`/host/${exp.owner._id}`}>{exp.owner.fullName}</Link></h6>
                            <h5>A word about the experience</h5>
                            <p>{exp.desc}</p>
                            <Menu menu={exp.menu} />
                            <hr />
                        </section>

                        <section className="exp-reviews">
                            <h4>Reviews</h4>
                            <ul>
                                {
                                    exp.reviews.map((review, idx) =>
                                        <li key={`review-${idx}-${exp._id}`}>
                                            {review.by.fullName}:&nbsp;
                                            {review.txt}
                                            <br />
                                            
                                            <StyledRating  value={review.rate} readOnly />
                                        </li>
                                    )}
                            </ul>
                            <button onClick={this.toggleAddReviewShown}>Add review</button>
                            {
                                isAddReviewShown &&
                                <form onSubmit={this.onAddReview}>
                                    <input autoComplete="off" name="txt" onChange={this.onHandleChange} value={review.txt} type="text" />
                                    <StyledRating defaultValue={1} name="rate" onChange={this.onHandleChange} value={review.rate} />
                                    <button>Send</button>
                                </form>
                            }
                        </section>
                    </div>
                    <section className="exp-booking">
                        <div className="flex space-between">
                            <span className="price">${exp.price}  <span >/ Person &nbsp;</span></span>
                            <ExpRate reviews={exp.reviews} />
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
        user: state.user.loggedInUser,
        exps: state.exp.exps
    };
};

const mapDispatchToProps = {
    saveExp
};

export const ExpDetails = connect(mapStateToProps, mapDispatchToProps)(_ExpDetails);
const StyledRating = withStyles({ iconFilled: { color: '#fd7854' } })(Rating);
