import React, { Component } from 'react'
import { connect } from 'react-redux';
import { loadExps } from '../store/actions/expAction';


class _ExpApp extends Component {

    async componentDidMount() {
        await this.props.loadExps();
        console.log(this.props.exps);
        // this.setState({exps}, () => console.log(this.state.exps))
    }
    render() {
        const { exps } = this.props;
        if(!exps) return <div></div>
        return (
            <div>
                {/* <ExpList /> */}
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
    loadExps
};

export const ExpApp = connect(mapStateToProps, mapDispatchToProps)(_ExpApp);