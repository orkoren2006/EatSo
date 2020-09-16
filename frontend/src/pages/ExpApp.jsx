import React, { Component } from 'react'
import { connect } from 'react-redux';

class _ExpApp extends Component {
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
        
    };
  };
  const mapDispatchToProps = {
  
  };
  
  export const ExpApp =  connect(mapStateToProps, mapDispatchToProps)(_ExpApp);