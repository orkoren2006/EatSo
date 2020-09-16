import React, { Component } from 'react'
import { connect } from 'react-redux';
import { loadExps, removeExp } from '../store/actions/expAction';

class _ExpList extends Component {

    async componentDidMount() {
        await this.props.loadExps();
        // this.setState({exps}, () => console.log(this.state.exps))
    }

    render() {
        const { exps } = this.props;
        if (!exps) return <div></div>
        return (
            <div>
                
                <ul>
                    {
                        exps.map(exp => <li key={exp._id}>{exp.name} <img src={exp.imgUrls[0]} alt="popo"></img></li>)
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

export const ExpList = connect(mapStateToProps, mapDispatchToProps)(_ExpList);