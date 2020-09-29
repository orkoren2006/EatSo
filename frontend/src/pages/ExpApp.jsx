import React, { Component } from 'react'
import { connect } from 'react-redux';
import { loadExps, removeExp } from '../store/actions/expAction';
import { ExpList } from '../cmps/ExpList';
import { Loading } from '../cmps/Loading';

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
<<<<<<< HEAD
        if (!exps) return <div></div>
        // if (!isLoading) return <div>Itay</div>
=======
        // if (!exps) return <div></div>
<<<<<<< HEAD
        if (!this.props.isLoading) return <Loading />
=======
        if (this.props.isLoading) return <div>Itay</div>
>>>>>>> 65b8a81c510fac9b219dec5d06091f06946bdf6e
>>>>>>> 1ec98c673a32987267cb6d2c9d32483a4ef75f3a

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
        exps: state.exp.exps,
        isLoading: state.system.isLoading
    };
};

const mapDispatchToProps = {
    loadExps,
    removeExp
};

export const ExpApp = connect(mapStateToProps, mapDispatchToProps)(_ExpApp);