import React, { Component } from 'react'
import { connect } from 'react-redux';
import { loadExps, removeExp } from '../store/actions/expAction';
import { ExpList } from '../cmps/ExpList';
import { Loading } from '../cmps/Loading';
import { ExpFilter } from '../cmps/ExpFilter';

class _ExpApp extends Component {

    state = {
        resultsMsg: ''
    }

    async componentDidMount() {
        await this._loadExps()
    }

    async componentDidUpdate(prevProps,prevState) {
        if (prevProps.match === this.props.match) return
        this.setState({resultsMsg:''})
        await this._loadExps()
    }

    async _loadExps() {
        let filterBy = {};
        let filterStr = '';
        const qParams = new URLSearchParams(this.props.location.search)
        for (const [key, value] of qParams.entries()) {
            filterBy[key] = value;
            filterStr += ` "${value}"`
        }
        if (Object.keys(filterBy).length) {
            this.setState({ resultsMsg: `showing results for ${filterStr}` })
        }
        await this.props.loadExps(filterBy);
    }

    render() {
        const { exps } = this.props;
        if (this.props.isLoading || !exps) return <Loading />
        return (
         
            <div className="exp-app">
                <ExpFilter/>
                {this.state.resultsMsg && <h4>{this.state.resultsMsg}</h4>}
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
        exps: state.exp.exps,
        isLoading: state.system.isLoading
    };
};

const mapDispatchToProps = {
    loadExps,
    removeExp
};

export const ExpApp = connect(mapStateToProps, mapDispatchToProps)(_ExpApp);