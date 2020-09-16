import React, { Component } from 'react'
import { connect } from 'react-redux';

class _ExpDetails extends Component {

    state = {
        exp: null
    }

    async componentDidMount() {
        console.log(this.props.match.params.id);
        // const exp = expSe
    }
    

    render() {
        return (
            <div>
               Details 
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        
    };
  };
  const mapDispatchToProps = {
    // getById
  };
  
  export const ExpDetails =  connect(mapStateToProps, mapDispatchToProps)(_ExpDetails);