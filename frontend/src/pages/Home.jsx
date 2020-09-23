import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ExpList } from '../cmps/ExpList';
import { loadExps } from '../store/actions/expAction';
import { Button } from '@material-ui/core';
import { HomeCardList } from '../cmps/HomeCardList';





class _Home extends Component {

  async componentDidMount() {
    await this.props.loadExps()
  }

  getExps = (attr) => {
    let expsToSend;
    const [field, value] = attr.split('-')
    const valueRegex = new RegExp(`${value}`, 'i')

    switch (field) {
      case 'tag':
        expsToSend = this.props.exps.filter(exp => {
          return exp.tags.some(tag => {
            return valueRegex.test(tag)
          })
        })
        break;
      case 'address':
        expsToSend = this.props.exps.filter(exp => {
          return valueRegex.test(exp.location.address)
        })
        break;
      case 'capacity':
        if (value === 'multi') {
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
      <section className="home full">
        <div className="hero-image flex column">

          <h2>Experience food </h2>
          <h1>differently<span className="animate__animated animate__bounce">.</span></h1>
        </div>
      
        <HomeCardList />

        <section className="tel-aviv">
          <section className="preview-header">
            <h2>Top Dinners in your Location</h2>
            <Button className="tel-aviv-button"><span> Show All &gt;</span></Button>
          </section>
          <ExpList exps={this.getExps('address-tel-aviv')} />

        </section>

        <section className="traditional">
          <section className="preview-header">
            <h2>Top Traditional Cuisine</h2>
            <Button className="traditional-button "><span> Show All  &gt;</span></Button>
          </section>
          <ExpList exps={this.getExps('tag-traditional')} />
        </section>

        <section className="tokyo-banner flex justify-center align-center">
          <div className="width-40"></div>
          <div>
            <h2> Eat real traditional</h2>
            <h2> sushi in <span>Tokyo</span></h2>
            <Button className="sushi-button" variant="contained" color="secondary">Show More</Button>
          </div>
        </section>

        <section className="scenic">
          <section className="preview-header">
            <h2>Top Scenic Meals</h2>
            <Button className="scenic-button"><span> Show All &gt;</span></Button>
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
