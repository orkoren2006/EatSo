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
        const expAs = this.props.match.params.as; // gets 'host' OR 'participants' - from url
        this.setState({ isHost: (expAs === 'owner') })
        await this._getUserExps(expAs)
        await this._getUserBooking()
        this.getExpsList()
    }

    async componentDidUpdate(prevProps, prevState) {

        if (prevProps === this.props) return
        const expAs = this.props.match.params.as; // gets 'owner' OR 'participants' - from url
        this.setState({ isHost: (expAs === 'owner') }, () => this.getExpsList())
    }

    async _getUserExps(expAs) {
        console.log('_id', expAs,this.props.user._id);
        const userExps = await expService.getExps({ [`${expAs}._id`]: this.props.user._id })
        this.setState({ userExps }, ()=> console.log(this.state))
    }

    async _getUserBooking() {
        const userBookings = await bookingService.getBookings({ _id: this.props.user._id })
        this.setState({ userBookings })
    }

    onExpTimeFilter = ({ target }) => {
        this.setState({ filter: target.id }, () => this.getExpsList())

    }

    getExpsList = () => {
        console.log(this.state.userExps, 'booking' ,this.state.userBookings);
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
        console.log('expList',expList);
        if (!user) return <div>Itay Loading...</div>
        return (
            <section className="user-exp-div">
                ITAY
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