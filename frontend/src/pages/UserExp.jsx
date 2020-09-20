import React, { Component } from 'react'
import { connect } from 'react-redux';
import { expService } from '../services/expService';
import { loadExps, removeExp } from '../store/actions/expAction'
import { ExpList } from "../cmps/ExpList";
class _UserExp extends Component {

    state = {
        user: '',
        userExps: '',
        type: 'participant',
        subField: 'all'
    }

    async componentDidMount() {
        const userId = this.props.user._id;
        await this.props.loadExps({ _id: userId })
        const userExps = await expService.getExps({ _id: userId })
        // console.log(userExps);
        this.setState({ userExps }, () => console.log(this.state))
    }

    onSubField = ({target}) => {
        this.setState({subField: target.id},()=>console.log(this.state))
    }

    render() {
        const { user, exps } = this.props;
        if (!user || !exps) return <div>Itay Loading...</div>
        return (
            <React.Fragment>
                ITAY
                <section>
                    <h2>{user.fullName}</h2>
                    <p>{user.desc}</p>
                    <h3>Experiences As a {this.state.type}</h3>
                </section>
                <section className="user-exp-navbar">
                    <ul className="user-exp-navbar-list">
                        <li key="past-exps" id="past" onClick={this.onSubField}>Past Exp.</li>
                        <li key="future-exps" id="future" onClick={this.onSubField}>Future Exp.</li>
                        <li key="all-exps" id="all" onClick={this.onSubField}>All</li>
                    </ul>

                    {/* <ExpList exps={exps} /> */}
                </section>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        exps: state.exp.exps,
        user: state.user.loggedInUser
    };
};

const mapDispatchToProps = {
    loadExps,
    removeExp
};

export const UserExp = connect(mapStateToProps, mapDispatchToProps)(_UserExp);