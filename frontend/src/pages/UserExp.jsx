import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { expService } from '../services/expService';
import { loadExps, removeExp } from '../store/actions/expAction'
import { ExpList } from "../cmps/ExpList";
import { Button } from '@material-ui/core';


class _UserExp extends Component {

    state = {
        user: '',
        userExps: '',
        filter: 'all',
        isHost: false
    }

    async componentDidMount() {
        const userId = this.props.user._id;
        const expAs = this.props.match.params.as; // gets 'host' OR 'participant' - from url
        this.setState({ isHost: (expAs === 'owner') ? true : false })
        // await this.props.loadExps({ userId: userId, field: 'owner' })
        const userExps = await expService.getExps({ userId: userId, field: expAs })
        this.setState({ userExps })
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevProps === this.props) return
        const userId = this.props.user._id;
        const expAs = this.props.match.params.as;
        this.setState({ isHost: (expAs === 'owner') ? true : false })
        const userExps = await expService.getExps({ userId: userId, field: expAs })
        this.setState({ userExps })
    }

    onExpTimeFilter = ({ target }) => {
        this.setState({ filter: target.id })
    }

    getExpsToShow = () => {
        let expsToShow = this.state.userExps;
        if (this.state.filter === 'past') {
            expsToShow = this.state.userExps.filter(exp => {
                return exp.schedule.at < Date.now()
            })
        } else {
            expsToShow = this.state.userExps.filter(exp => {
                return exp.schedule.at > Date.now()
            })
        }
        return expsToShow
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
                        ((this.getExpsToShow().length) ?
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
        user: state.user.loggedInUser
    };
};

const mapDispatchToProps = {
    loadExps,
    removeExp
};

export const UserExp = connect(mapStateToProps, mapDispatchToProps)(_UserExp);