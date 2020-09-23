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
        userExps: [], // for exps as a host
        userBookings: [], // for exps as a participants
        filter: 'past',
        isHost: false,
        expList: null
    }

    async componentDidMount() {
        // console.log(this.props.user._id);
        // this.setState({userId: this.props.user._id});
        const expAs = this.props.match.params.as; // gets 'host' OR 'participant' - from url
        this.setState({ isHost: (expAs === 'owner') })
        // const field = (expAs === 'owner') ? 'owner' : 'participants';
        await this._getUserExps()
        await this._getUserBooking()
        this.getExpsList()
        // this._getUserExps(userId, field)
        // this._getUserBooking(userId, field)
        // if (field !== 'owner') this._getParticipantPastExp(userId, field)
    }

    async componentDidUpdate(prevProps, prevState) {

        if (prevProps === this.props) return
        const expAs = this.props.match.params.as; // gets 'owner' OR 'participant' - from url
        this.setState({ isHost: (expAs === 'owner') }, () => this.getExpsList())
    }

    async _getUserExps() {
        const userExps = await expService.getExps({ _id: this.props.user._id })
        this.setState({ userExps })
    }

    async _getUserBooking() {
        const userBookings = await bookingService.getBookings({ _id: this.props.user._id })
        this.setState({ userBookings })
    }

    onExpTimeFilter = ({ target }) => {
        this.setState({ filter: target.id }, () => this.getExpsList())

    }

    getExpsList = () => {

        if (this.state.isHost) this.setState({ expList: this.state.userExps })

        else if (this.state.filter === 'pending') {
            const pendingExpArr = [];
            this.state.userBookings.forEach(booking => {
                if (booking.status === 'pending') {
                    const item = expService.getExpById(booking.exp._id)
                    pendingExpArr.push(item)
                }
            })
            Promise.all(pendingExpArr)
                .then(expList => {
                    this.setState({ expList })
                })
        } else if (this.state.filter !== 'pending') {
            const approvedBookings = this.state.userBookings.filter(booking => {
                return (booking.status === 'approved')
            })
            const pastExpArr = [];
            if (this.state.filter === 'past') {
                approvedBookings.forEach((booking) => {
                    if (booking.exp.schedule.at < Date.now()) {
                        const item = expService.getExpById(booking.exp._id)
                        pastExpArr.push(item)
                    }
                })
            } else {
                approvedBookings.forEach((booking) => {
                    if (booking.exp.schedule.at > Date.now()) {
                        const item = expService.getExpById(booking.exp._id)
                        pastExpArr.push(item)
                    }
                })
            }
            Promise.all(pastExpArr)
                .then(expList => {
                    this.setState({ expList })
                })
        }
    }


    render() {
        const { user } = this.props;
        const { expList } = this.state
        if (!user) return <div>Itay Loading...</div>
        return (
            <section className="user-exp-div">
                <h3 className="user-exp-type">Experiences As a {(this.state.isHost) ? 'Host' : "Participants"} </h3>
                {!this.state.isHost && <section className="user-exp-navbar">
                    <ul className="user-exp-navbar-list flex">
                        <li key="past-exps" className={(this.state.filter === 'past') ? 'clicked' : ''}
                            id="past" onClick={this.onExpTimeFilter}>Past</li>
                        <li key="future-exps" className={(this.state.filter === 'future') ? 'clicked' : ''}
                            id="future" onClick={this.onExpTimeFilter}>Upcoming</li>
                        <li key="pending-exps" className={(this.state.filter === 'pending') ? 'clicked' : ''}
                            id="pending" onClick={this.onExpTimeFilter}>Pending</li>
                    </ul>
                </section>
                }
                <Link to="/exp/edit"><Button variant="contained" color="primary">
                    Add Experience</Button></Link>

                <section className="user-exp-list">
                    {this.state.userExps &&
                        ((expList) ?
                            <ExpList exps={expList} isHost={this.state.isHost} /> : <h2>No Exps To Show</h2>)}
                </section>
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
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