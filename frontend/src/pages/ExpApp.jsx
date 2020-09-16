import React, { Component } from 'react'
import { connect } from 'react-redux';
import { loadExps, removeExp } from '../store/actions/expAction';


class _ExpApp extends Component {

    async componentDidMount() {
        await this.props.loadExps();
        console.log(this.props.exps);
        // this.setState({exps}, () => console.log(this.state.exps))
    }

    render() {
        const { exps } = this.props;
        if (!exps) return <div></div>
        return (
            <div>
                
                {/* <ul>
                    {
                        exps[0].imgUrls.map(imgUrl => <img alt="a" src={imgUrl}/>)
                    }
                </ul> */}
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