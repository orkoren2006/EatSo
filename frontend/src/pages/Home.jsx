import React, { Component } from 'react';
import { connect } from 'react-redux';


class _Home extends Component {
  state = {

  };
  componentDidMount() {

  }


  render() {
    return (
      <div className="home">
        Home!
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {

  };
};
const mapDispatchToProps = {

};

export const Home =  connect(mapStateToProps, mapDispatchToProps)(_Home);
