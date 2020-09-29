import React, { Component } from 'react'
import { connect } from 'react-redux';
import { loadExps, removeExp } from '../store/actions/expAction';
import { ExpList } from '../cmps/ExpList';

class _ExpApp extends Component {

    state = {
        resultsMsg: ''
    }

    async componentDidMount() {
        await this._loadExps()

    }

    async componentDidUpdate(prevProps,prevState) {
        console.log('from update',prevProps);
        if (prevProps.match === this.props.match) return
        this.setState({resultsMsg:''})
        await this._loadExps()
    }

    async _loadExps() {
        let filterBy = {};
        let filterStr = '';
        const qParams = new URLSearchParams(this.props.location.search)
        // if (this.props.match.params.field) {filterBy = {[this.props.match.params.field]:this.props.match.params.value}}
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
        if (!exps) return <div></div>
        return (
            <div>
                {this.state.resultsMsg && <h2>{this.state.resultsMsg}</h2>}
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