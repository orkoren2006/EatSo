import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ExpList } from '../cmps/ExpList';
import { loadExps } from '../store/actions/expAction';
import { Button } from '@material-ui/core';
import { HomeCardList } from '../cmps/HomeCardList';
import { ExpFilter } from '../cmps/ExpFilter';
import { Loading } from '../cmps/Loading';


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
    expsToSend = expsToSend.splice(0, 4)
    return expsToSend;
  }

  onShowAllBtn = (filterBy) => {
    const key = Object.keys(filterBy)[0]
    const value = Object.values(filterBy)[0]

    this.props.history.push(`/exp?${key}=${value}`)
  }





  render() {
    const { exps } = this.props
    if (this.props.isLoading || !exps) return <Loading />

    return (
      <section className="home full main-container" >
        <div className="hero-image flex column full">

          <h2>Change your food </h2>
          <h1>experience<span className="animate__animated animate__bounce">.</span></h1>
          <p>Discover exciting ways to dine out anywhere you like.</p>
          <ExpFilter />
        </div>

        <HomeCardList />

        <section className="home-category flex column space-between">
          <section className="preview-header flex space-between align-start">
            <h2>Top Dinners in your Location</h2>
            <Button onClick={() => this.onShowAllBtn({ 'location.city': 'Tel Aviv' })}
              className="tel-aviv-button"><span> Show All &gt;</span></Button>
          </section>
          <ExpList exps={this.getExps('address-tel-aviv')} />


        </section>

        <section className="home-category flex column space-between">
          <section className="preview-header flex space-between align-start">
            <h2>Top Traditional Cuisine</h2>
            <Button onClick={() => this.onShowAllBtn({ tags: 'traditional' })} className="traditional-button "><span> Show All  &gt;</span></Button>
          </section>
          <ExpList exps={this.getExps('tags-traditional')} />

        </section>

        <section className="tokyo-banner flex justify-end align-center full">

          <div className="tokyo-banner-content">
            <h2> Eat real traditional sushi in</h2>
            <h2><span>Tokyo</span></h2>
            <Button onClick={() => this.props.history.push('exp/5f731e5d15cdc8492815a652')}
              className="sushi-button" variant="contained" color="secondary">Show More</Button>
          </div>
        </section>

        <section className="home-category flex column space-between">
          <section className="preview-header flex space-between align-start">
            <h2>Top Outdoor Meals</h2>
            <Button onClick={() => this.onShowAllBtn({ tags: 'outdoor' })}
              className="outdoor-button"><span> Show All &gt;</span></Button>
          </section>
          <ExpList exps={this.getExps('tags-outdoor')} />

        </section>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    exps: state.exp.exps,
    isLoading: state.system.isLoading
  };
};
const mapDispatchToProps = {
  loadExps
};

export const Home = connect(mapStateToProps, mapDispatchToProps)(_Home);
