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
        if(!this.props.exps) this.props.loadExps();
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
        if (!this.props.user) return this.onShowMaodl();
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
        const { exp, review, isModalShown, isAddReviewShown } = this.state;
        const { user } = this.props;
        console.log(user);
        if (!exp) return <div>  </div>
        const center = { lat: exp.location.lat, lng: exp.location.lng }
        return (
            <div className="exp-details-container width-1366">
                <Modal onCloseModal={this.onCloseModal} isShown={isModalShown} >
                    <LoginSignup closeModal={this.onCloseModal}/>
                </Modal>
                <h2>{exp.name}</h2>
                <ExpRate reviews={exp.reviews} />
                <ExpGallery imgUrls={exp.imgUrls} />
                <ExpContent exp={exp} review={review} toggleAddReviewShown={this.toggleAddReviewShown}
                onHandleChange={this.onHandleChange} onAddReview={this.onAddReview}
                isAddReviewShown={isAddReviewShown} onBookClick={this.onBookClick} />
                <div className="flex space-between ">
                <GoogleMap containerStyle={{ width: '50%', height: 150 }} style={{ height: 150 }} center={center} />
                {user && <ExpChat userName={user.userName} />}
                </div>
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
    saveExp,
    loadExps
};

export const ExpDetails = connect(mapStateToProps, mapDispatchToProps)(_ExpDetails);

