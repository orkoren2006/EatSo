import React, { Component } from 'react'
import { connect } from 'react-redux';
import { GoogleMap } from '../cmps/GoogleMap';
import { hostService } from '../services/hostService';
import { loadExps, removeExp } from '../store/actions/expAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { HostList } from '../cmps/HostList';
import { Loading } from '../cmps/Loading';

class _HostDetails extends Component {

    state = {
        host: null,
        exps: null,
    }

    async componentDidMount() {
        const hostId = this.props.match.params.id;
        const host = await hostService.getById(hostId);
        if (!host) return;
        this.setState({ host })
        await this.props.loadExps({ 'owner._id': hostId })
    }

    render() {
        const { host } = this.state;
        const { exps } = this.props;
        if (!exps || !host) return <Loading />
        return (

            <section className="host-page-list">
                <HostList exps={exps} host={host} />
                {/* {exps.map(exp => <HostList key={exp._id} exp={exp} host={host} />)} */}
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        exps: state.exp.exps,
        isLoading: state.system.isLoading
    };
};

const mapDispatchToProps = {
    loadExps,
    removeExp
};

export const HostDetails = connect(mapStateToProps, mapDispatchToProps)(_HostDetails);