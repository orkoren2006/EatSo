import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class _Home extends Component {
  state = {

  };
  componentDidMount() {

  }


  render() {
    return (
      <section className="home">
        <div className="hero-image flex">
          <h1>Where love and food meet<span>.</span></h1>
        </div>
        <div className="flex flex center align-center preview-cards">
          <Link to="/exp"><div className="preview-image img-1 flex align-center justify-center"><h3>Dinners</h3></div></Link>
          <Link to="/exp"><div className="preview-image img-2 flex align-center justify-center"><h3>Workshops</h3></div></Link>
          <Link to="/exp"> <div className="preview-image img-3 flex align-center justify-center"><h3>Tours</h3></div></Link>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {

  };
};
const mapDispatchToProps = {

};

export const Home = connect(mapStateToProps, mapDispatchToProps)(_Home);
