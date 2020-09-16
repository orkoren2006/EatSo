import React, { Component } from 'react'
import { connect } from 'react-redux';


class _ExpEdit extends Component {

    componentDidMount(){
        console.log('mounted');
    }
    render() {
        return (
            <div>
                My Edit
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        
    };
};
const mapDispatchToProps = {
    
};

export const ExpEdit = connect(mapStateToProps, mapDispatchToProps)(_ExpEdit);
