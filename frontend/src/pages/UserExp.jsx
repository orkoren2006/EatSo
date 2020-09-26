import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { expService } from '../services/expService';
import { getExpById, loadExps, removeExp, saveExp } from '../store/actions/expAction'
import { ExpList } from "../cmps/ExpList";
import { Button } from '@material-ui/core';
import { loadBookings, saveBooking } from '../store/actions/bookingAction';
import { bookingService } from '../services/bookingService';
import { socketService } from '../services/socketService';
import { BookingList } from '../cmps/BookingList';

class _UserExp extends Component {

    state = {
        userExps: [], // for exps as a host
        userBookings: [], // for exps as a participants
        filter: 'pending',
        isHost: false,
        expList: null,
        toApproveBookings: null,
    }

    async componentDidMount() {
        // console.log(this.props.user._id);
        // this.setState({userId: this.props.user._id});
        const expAs = this.props.match.params.as; // gets 'host' OR 'participants' - from url
        this.setState({ isHost: (expAs === 'owner') })
        // const field = (expAs === 'owner') ? 'owner' : 'participants';
        await this.props.loadBookings();
        await this._getUserExps(expAs)
        await this._getUserBooking()
        await this.getExpsList()
        socketService.on('new booking', this.newBookNotification)

        const toApproveBookings = this.props.bookings.filter(booking => booking.status === 'pending' && booking.exp.owner._id === this.props.user._id)
        this.setState({ toApproveBookings })
    }

    async componentDidUpdate(prevProps, prevState) {

        if (prevProps === this.props) return
        const expAs = this.props.match.params.as; // gets 'owner' OR 'participants' - from url
        this.setState({ isHost: (expAs === 'owner') }, () => this.getExpsList())
        const toApproveBookings = this.props.bookings.filter(booking => booking.status === 'pending' && booking.exp.owner._id === this.props.user._id)
        this.setState({ toApproveBookings })
    }

    componentWillUnmount() {
        socketService.off('new booking', this.newBookNotification)

    }


    newBookNotification = (booking) => {
        this.props.loadBookings()
    }

    onChangeStatusBooking = async (bookingId, newStatus) => {
        const booking = await bookingService.getById(bookingId);
        booking.status = newStatus;
        this.props.saveBooking(booking)
        if (newStatus === 'approved') {
            const exp = await expService.getById(booking.exp._id)
            exp.participants.push(booking.guest);
            this.props.saveExp(exp)
        }
        socketService.emit('booking status change', booking)
    }

    async _getUserExps(expAs) {
        // console.log('getUserExp', expAs);
        const userExps = await expService.query({ [`${expAs}._id`]: this.props.user._id })
        this.setState({ userExps })
    }

    async _getUserBooking() {
        const userBookings = await bookingService.query({ _id: this.props.user._id })
        this.setState({ userBookings })
    }

    onExpTimeFilter = ({ target }) => {
        this.setState({ filter: target.id }, () => this.getExpsList())
    }

    async getExpsList() {
        // console.log(this.state.userExps, 'booking', this.state.userBookings);
        if (this.state.isHost) this.setState({ expList: this.state.userExps })

        else if (this.state.filter === 'pending') {
            const pendingExpArr = [];
            this.state.userBookings.forEach(booking => {
                if (booking.status === 'pending' && booking.exp.schedule.at > Date.now()) {
                    const item = expService.getById(booking.exp._id)
                    pendingExpArr.push(item)
                }
            })
            const expList = await Promise.all(pendingExpArr)
            this.setState({ expList })

        } else if (this.state.filter !== 'pending') {
            const approvedBookings = this.state.userBookings.filter(booking => {
                return (booking.status === 'approved')
            })
            const pastExpArr = [];
            if (this.state.filter === 'past') {
                approvedBookings.forEach((booking) => {
                    if (booking.exp.schedule.at < Date.now()) {
                        const exp = expService.getById(booking.exp._id)
                        pastExpArr.push(exp)
                    }
                })
            } else {
                approvedBookings.forEach((booking) => {
                    if (booking.exp.schedule.at > Date.now()) {
                        const exp = expService.getById(booking.exp._id)
                        pastExpArr.push(exp)
                    }
                })
            }
            const expList = await Promise.all(pastExpArr)
            this.setState({ expList })

        }
    }


    render() {
        const { user } = this.props;
        const { expList, toApproveBookings } = this.state
        if (!user) return <div>Itay Loading...</div>
        return (
            <section className="user-exp-div">
                <h3 className="user-exp-type">Experiences As a {(this.state.isHost) ? 'Host' : "Participants"} </h3>
                {!this.state.isHost &&
                    <section className="user-exp-navbar">
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
                {this.state.isHost && <Link to="/exp/edit"><Button variant="contained" color="primary">
                    Add Experience</Button></Link>}

                <section className="user-exp-list">
                    {
                        ((expList) ?
                            <ExpList exps={expList} isHost={this.state.isHost} /> : <h2>No Exps To Show</h2>)
                    }
                </section>

                {
                    this.state.isHost &&
                    <section className="booking-to-approve">
                        {toApproveBookings && <BookingList bookings={toApproveBookings} onChangeStatusBooking={this.onChangeStatusBooking} />}
                    </section>
                }
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.loggedInUser,
        bookings: state.booking.bookings
    };
};

const mapDispatchToProps = {
    loadExps,
    removeExp,
    loadBookings,
    getExpById,
    saveBooking,
    saveExp
};

export const UserExp = connect(mapStateToProps, mapDispatchToProps)(_UserExp);