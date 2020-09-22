import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { expService } from '../services/expService';
import { getExpById, loadExps, removeExp } from '../store/actions/expAction'
import { ExpList } from "../cmps/ExpList";
import { Button } from '@material-ui/core';
import { loadBookings } from '../store/actions/bookingAction';
import bookingService from '../services/bookingService';

class _UserExp extends Component {

    state = {
        user: '',
        userExps: '',
        filter: 'past',
        isHost: false,
        pastBookedExps: undefined
    }

    async componentDidMount() {
        const userId = this.props.user._id;
        const expAs = this.props.match.params.as; // gets 'host' OR 'participant' - from url
        const field = (expAs === 'owner') ? 'owner' : 'participants';
        this.setState({ isHost: (expAs === 'owner') ? true : false })
        this._getUserExps(userId, field)

        if (field !== 'owner') this._getParticipantPastExp(userId, field)

        // const userId = this.props.user._id;
        // const expAs = this.props.match.params.as; // gets 'host' OR 'participant' - from url
        // this.setState({ isHost: (expAs === 'owner') ? true : false })
        // await this.props.loadExps({ userId: userId, field: 'owner' })
        // const userExps = await expService.getExps({ field: expAs, value: userId })
        // const pastBooked = await bookingService.getBookings({ field: 'past', value: userId })
        // const pastBookedExps =  pastBooked.map( async (booking) => {
        //    return await expService.getExpById(booking.exp._id)
        // })
        // Promise.all(pastBookedExps)
        // .then(res => this.setState({ pastBookedExps: res }))
        // this.setState({ userExps})
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevProps === this.props) return
        const userId = this.props.user._id;
        const expAs = this.props.match.params.as; // gets 'owner' OR 'participant' - from url
        const field = (expAs === 'owner') ? 'owner' : 'participants';
        this.setState({ isHost: (expAs === 'owner') ? true : false })
        this._getUserExps(userId, field)
        // this.setState({pastBookedExps: undefined})
        
        if (field !== 'owner') this._getParticipantPastExp(userId, field)
        // const userId = this.props.user._id;
        // const expAs = this.props.match.params.as;
        // const field = (expAs === 'owner') ? 'owner':'participants';
        // this.setState({ isHost: (expAs === 'owner') ? true : false })
        // this._getUserExps(userId,field)
        // const userExps = await expService.getExps({ field: expAs, value: userId })
        // this.setState({ userExps })
    }

    async _getUserExps(userId, field) {
        const userExps = await expService.getExps({ [field]: userId })
        this.setState({ userExps })
    }

    async _getParticipantPastExp(userId, field) {
        const pastBooked = await bookingService.getBookings({ [field]: userId, isOver: true })
        const pastBookedExps = pastBooked.map(async (booking) => {
            return await expService.getExpById(booking.exp._id)
        })
        Promise.all(pastBookedExps)
            .then(res => this.setState({ pastBookedExps: res }))
    }

    onExpTimeFilter = ({ target }) => {
        this.setState({ filter: target.id })
    }

    getExpsToShow = () => {
        let expToRender = this.state.userExps;
        // let expToRender;
        // console.log('booking',this.state.pastBookedExps, '\nexps',this.state.userExps);
        // debugger
        if (this.state.filter === 'past' && !this.state.isHost) {
            expToRender = this.state.pastBookedExps;

            // expsToShow = this.state.userExps.filter(exp => {
            //     return exp.schedule.at < Date.now()
            // })
        } else if (this.state.filter === 'past' && this.state.isHost) {
            expToRender = this.state.userExps.filter(exp => {
                // console.log(exp);
                return exp.schedule.at < Date.now()
            })
            if (!expToRender.length) expToRender = undefined
            // expsToShow = this.state.userExps.filter(exp => {
            //     return exp.schedule.at > Date.now()
            // })
        } else if (this.state.filter === 'past' && this.state.isHost){
            expToRender = undefined
        }
        console.log('render' ,expToRender);
        return expToRender

        // return expsToShow
        // return this.state.userExps
    }

    render() {
        const { user } = this.props;
        if (!user) return <div>Itay Loading...</div>
        return (
            // <React.Fragment className="user-exp-div">
            <section className="user-exp-div">
                <h3 className="user-exp-type">Experiences As a {(this.state.isHost) ? 'Host' : "Participants"} </h3>
                <section className="user-exp-navbar">
                    <ul className="user-exp-navbar-list flex">
                        <li key="past-exps" className={(this.state.filter === 'past') ? 'clicked' : ''}
                            id="past" onClick={this.onExpTimeFilter}>Past</li>
                        <li key="future-exps" className={(this.state.filter === 'future') ? 'clicked' : ''}
                            id="future" onClick={this.onExpTimeFilter}>Upcoming</li>
                        <li key="all-exps" className={(this.state.filter === 'all') ? 'clicked' : ''}
                            id="all" onClick={this.onExpTimeFilter}>All</li>
                    </ul>
                    {this.state.isHost &&
                        <Link to="/exp/edit"><Button variant="contained" color="primary">
                            Add Experience</Button></Link>}
                </section>
                <section className="user-exp-list">
                    {this.state.userExps &&
                        // ((this.getExpsToShow().length) ?
                        ((this.getExpsToShow()) ?
                            <ExpList exps={this.getExpsToShow()} isHost={this.state.isHost} /> : <h2>No Exps To Show</h2>)}
                </section>
            </section>
            // </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        // exps: state.exp.exps,
        user: state.user.loggedInUser,
        bookings: state.booking
    };
};

const mapDispatchToProps = {
    loadExps,
    removeExp,
    loadBookings,
    getExpById
};

export const UserExp = connect(mapStateToProps, mapDispatchToProps)(_UserExp);