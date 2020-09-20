import React, { Component } from 'react'
import { connect } from 'react-redux';
import { expService } from '../services/expService';
import { loadExps, removeExp } from '../store/actions/expAction'
import { ExpList } from "../cmps/ExpList";
class _UserExp extends Component {

    state = {
        user: '',
        userExps: '',
        filter: 'all'
    }

    async componentDidMount() {
        const userId = this.props.user._id;
        const expAs = this.props.match.params.as;
        // await this.props.loadExps({ userId: userId, field: 'owner' })
        const userExps = await expService.getExps({ userId: userId, field: expAs })
        this.setState({ userExps })
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevProps === this.props) return
        const userId = this.props.user._id;
        const expAs = this.props.match.params.as;
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
            <React.Fragment>
                <section>
                    <h3>Experiences As a {(this.props.match.params.as === 'owner') ? 'Host' : "Participants"} </h3>
                </section>
                <section className="user-exp-navbar">
                    <ul className="user-exp-navbar-list flex">
                        <li key="past-exps" className={(this.state.filter === 'past') ? 'clicked':''}
                            id="past" onClick={this.onExpTimeFilter}>Past</li>
                        <li key="future-exps" className={(this.state.filter === 'future') ? 'clicked':''}
                            id="future" onClick={this.onExpTimeFilter}>Upcoming</li>
                        <li key="all-exps" className={(this.state.filter === 'all') ? 'clicked':''}
                            id="all" onClick={this.onExpTimeFilter}>All</li>
                    </ul>
                    {this.state.userExps && 
                    ((this.getExpsToShow().length) ? 
                    <ExpList exps={this.getExpsToShow()}/>:<h2>No Exps To Show</h2>)}
                </section>
            </React.Fragment>
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