import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ExpList } from '../cmps/ExpList';
import { loadExps } from '../store/actions/expAction';
import { Button } from '@material-ui/core';


class _Home extends Component {

  componentDidMount() {
    this.props.loadExps()
  }

  getExps = (attr) => {
    let expsToSend;
    const [field, keyWord] = attr.split('-')
    const keyWordRegex = new RegExp(`${keyWord}`, 'i')

    switch (field) {
      case 'tag':
        expsToSend = this.props.exps.filter(exp => {
          return exp.tags.some(tag => {
            return keyWordRegex.test(tag)
          })
        })
        break;
      case 'address':
        expsToSend = this.props.exps.filter(exp => {
          return keyWordRegex.test(exp.location.address)
          })
        break;
    
      default:
        break;
    }

    
    return expsToSend; 
  }


  render() {
    const { exps } = this.props
    if (!exps) return <div>Load</div>
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
        <section className="traditional">
          <section className="teaditional-header">
            <h2>Top Traditional Cuisine</h2>
            <Button><span> All traditional -></span></Button>
          </section>
          <ExpList exps={this.getExps('tag-traditional')} />
        </section>
        <section className="tel-aviv">
          <section className="tel-aviv-header">
            <h2>Top Tel Aviv Meals</h2>
            <Button><span> All Tel Aviv -></span></Button>
          </section>
          <ExpList exps={this.getExps('address-tel-aviv')} />
        </section>
        <section className="scenic">
          <section className="tel-aviv-header">
            <h2>Top Scenic Meals</h2>
            <Button><span> All Scenic -></span></Button>
          </section>
          <ExpList exps={this.getExps('tag-scenic')} />
        </section>
      </section>
    );
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

export const Home = connect(mapStateToProps, mapDispatchToProps)(_Home);
