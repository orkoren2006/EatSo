import React, { Component } from 'react'
import { connect } from 'react-redux';
import { GoogleMap } from '../cmps/GoogleMap';
import { hostService } from '../services/hostService';
import { loadExps, removeExp } from '../store/actions/expAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { HostList } from '../cmps/HostList';

class _HostDetails extends Component {

    state = {
        host: null,
        exps: null,
    }

    async componentDidMount() {
        const id = this.props.match.params.id;
        const host = await hostService.getById(id);
        if (!host) return;
        this.setState({ host })
        await this.props.loadExps() //it seems a bit crooked, should it be like this ???
        const exps = this.props.exps.filter(exp => exp.owner._id === id)
        this.setState({ exps })
    }

    render() {
        const { host, exps } = this.state;
        if (!host) return <div>Loading...</div>
        if (!exps) return <div>Loading...</div>
        return (
            <React.Fragment>
                <section>
                    <h2>{host.fullName}</h2>
                    <p>{host.desc}</p>
                </section>
                <section>
                    {exps.map(exp => <HostList key={exp._id} exp={exp} />)}
                </section>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        exps: state.exp.exps
    };
};

const mapDispatchToProps = {
    loadExps,
    removeExp
};

export const HostDetails = connect(mapStateToProps, mapDispatchToProps)(_HostDetails);