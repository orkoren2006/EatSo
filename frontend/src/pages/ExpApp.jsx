import React, { Component } from 'react'
import { connect } from 'react-redux';
import { loadExps } from '../store/actions/expAction';


class _ExpApp extends Component {

    state = {
        exps: null
    }

    async componentDidMount(){
        const exps = await this.props.loadExps()
        console.log(exps)
        // this.setState({exps}, () => console.log(this.state.exps))
    }
    render() {
        return (
            <div>
                App
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        // exp: state.expReducer.exps
    };
  };
  const mapDispatchToProps = {
    loadExps
  };
  
  export const ExpApp =  connect(mapStateToProps, mapDispatchToProps)(_ExpApp);