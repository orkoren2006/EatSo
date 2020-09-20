import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ExpList } from '../cmps/ExpList';
import { loadExps } from '../store/actions/expAction';
import { Button } from '@material-ui/core';


class _Home extends Component {

  async componentDidMount() {
    await this.props.loadExps()
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
      case 'capacity':
        if (keyWord === 'multi') {
          expsToSend = this.props.exps.filter(exp => {
            return exp.capacity.min >= 20
          })
        } else {
          expsToSend = this.props.exps.filter(exp => {
            return exp.capacity.max <= 20
          })
        }
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
        <div className="hero-image flex column">

          <h2>Where love and food </h2>
          <h1> meet<span className="animate__animated animate__bounce">.</span></h1>
        </div>
        <section className="flex flex center wrap align-center preview-cards width-90">
          
          <div className="home-card-1">
            <Link to="/exp"><div className="preview-image img-1 flex align-center justify-center"><h3>Dinners</h3></div></Link>
          </div>
          <div className="home-card-2">
            <Link to="/exp"><div className="preview-image img-2 flex align-center justify-center"><h3>Workshops</h3></div></Link>
          </div>
          <div className="home-card-3">
            <Link to="/exp"> <div className="preview-image img-3 flex align-center justify-center"><h3>Tours</h3></div></Link>
          </div>
          <div className="home-card-4">
            <Link to="/exp"> <div className="preview-image img-3 flex align-center justify-center"><h3>Tours</h3></div></Link>
          </div>
          <div className="home-card-5">
            <Link to="/exp"> <div className="preview-image img-3 flex align-center justify-center"><h3>Tours</h3></div></Link>
          </div>
        </section>
        <section className="traditional">
          <section className="teaditional-header">
            <h2>Top Traditional Cuisine</h2>
            <Button><span> All traditional - &gt;</span></Button>
          </section>
          <ExpList exps={this.getExps('tag-traditional')} />
        </section>
        <section className="tokyo-banner flex justify-center align-center">
          <div className= "width-40"></div>
          <div>
            <h2> Eat real traditional</h2>
            <h2> sushi in Tokyo</h2>
          </div>
        </section>
        <section className="tel-aviv">
          <section className="tel-aviv-header">
            <h2>Top Tel Aviv Meals</h2>
            <Button><span> All Tel Aviv &gt;</span></Button>
          </section>
          <ExpList exps={this.getExps('address-tel-aviv')} />
        </section>
        <section className="scenic">
          <section className="tel-aviv-header">
            <h2>Top Scenic Meals</h2>
            <Button><span> All Scenic &gt;</span></Button>
          </section>
          <ExpList exps={this.getExps('tag-scenic')} />
        </section>
        <section className="multi-participants">
          <section className="capacity-header">
            <h2>Top Multi-Participants Meals</h2>
            <Button><span> All Multi-Participants &gt;</span></Button>
          </section>
          <ExpList exps={this.getExps('capacity-multi')} />
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
