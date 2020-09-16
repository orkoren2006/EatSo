import React, { Component } from 'react'
import { connect } from 'react-redux';

class _ExpDetails extends Component {
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
  
  };
  
  export const ExpDetails =  connect(mapStateToProps, mapDispatchToProps)(_ExpDetails);