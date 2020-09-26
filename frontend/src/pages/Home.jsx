import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ExpList } from '../cmps/ExpList';
import { loadExps } from '../store/actions/expAction';
import { Button } from '@material-ui/core';
import { HomeCardList } from '../cmps/HomeCardList';
import { Link } from 'react-router-dom';
import { ExpFilter } from '../cmps/ExpFilter';


class _Home extends Component {

  async componentDidMount() {
    await this.props.loadExps()
  }

  getExps = (attr) => {
    let expsToSend;
    const [field, value] = attr.split('-')
    const valueRegex = new RegExp(`${value}`, 'i')

    switch (field) {
      case 'tags':
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
    expsToSend = expsToSend.splice(0,4)
    return expsToSend;
  }

  onShowAll = (ev) => {
    console.log(ev.target.name);
  }





  render() {
    const { exps } = this.props
    if (!exps) return <div>Load</div>
    return (
      <section className="home full main-container ">
        <div className="hero-image flex column full">

          <h2>Change your food </h2>
          <h1>experience<span className="animate__animated animate__bounce">.</span></h1>
          <p>Discover exciting ways to dine out anywhere you like.</p>
          <ExpFilter />
        </div>

        <HomeCardList />

        <section className="home-category flex column space-between">
          <section className="preview-header flex ">
            <h2>Top Dinners in your Location</h2>
            <Link to="/exp/location.city/Tel-Aviv-Yafo">
              <Button className="tel-aviv-button"><span> Show All &gt;</span></Button>
            </Link>
          </section>
          <ExpList exps={this.getExps('address-tel-aviv')} />
           

        </section>

        <section className="home-category flex column space-between">
          <section className="preview-header flex">
            <h2>Top Traditional Cuisine</h2>
            <Link to="/exp/tags/traditional">
              <Button className="traditional-button "><span> Show All  &gt;</span></Button>
            </Link>
          </section>
          <ExpList exps={this.getExps('tags-traditional')} />
            
        </section>

        <section className="tokyo-banner flex justify-center align-center full">
          <div className="width-40"></div>
          <div>
            <h2> Eat real traditional sushi in</h2>
            <h2><span>Tokyo</span></h2>
            <Button className="sushi-button" variant="contained" color="secondary">Show More</Button>
          </div>
        </section>

        <section className="home-category flex column space-between">
          <section className="preview-header flex">
            <h2>Top Scenic Meals</h2>
            <Link to="/exp/tags/scenic">
              <Button className="scenic-button"><span> Show All &gt;</span></Button>
            </Link>
          </section>
          <ExpList exps={this.getExps('tags-scenic')} />
           
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
