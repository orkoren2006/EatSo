import React, { Component } from 'react'
import { connect } from 'react-redux';
import { loadExps, removeExp } from '../store/actions/expAction';
import { ExpList } from '../cmps/ExpList';

class _ExpApp extends Component {

    async componentDidMount() {

        let filterBy = {};
        const qParams = new URLSearchParams(this.props.location.search)
        // if (this.props.match.params.field) {filterBy = {[this.props.match.params.field]:this.props.match.params.value}}
        for (const [key, value] of qParams.entries()) {
            filterBy[key] = value;
        }

        await this.props.loadExps(filterBy);
    }

    render() {
        const { exps } = this.props;
        if (!exps) return <div></div>
        return (
            <div>
                <ul>
                    {
                        <ExpList exps={exps} />
                    }
                </ul>
            </div>
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

export const ExpApp = connect(mapStateToProps, mapDispatchToProps)(_ExpApp);