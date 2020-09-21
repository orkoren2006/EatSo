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

          <h2>Experience food </h2>
          <h1>differently<span className="animate__animated animate__bounce">.</span></h1>
        </div>
        <section className="flex flex center wrap align-center preview-cards width-1366">

          <div className="home-card home-card-1">
            <Link to="/exp"><div className="preview-image img-1 flex column align-start justify-start"><h3>Outdoor</h3><h4>dinner experiences</h4></div></Link>
          </div>
          <div className="home-card home-card-2">
            <Link to="/exp"><div className="preview-image img-2 flex column align-start justify-start"><h3>Traditional</h3><h4>cuisine</h4></div></Link>
          </div>
          <div className="home-card home-card-2">
            <Link to="/exp"> <div className="preview-image img-3 flex column align-start justify-start"><h3>Romantic</h3><h4>dinners</h4></div></Link>
          </div>
          <div className="home-card home-card-2">
            <Link to="/exp"> <div className="preview-image img-4 flex column align-start justify-start"><h3>Holiday</h3><h4>meals</h4></div></Link>
          </div>
          <div className="home-card home-card-2">
            <Link to="/exp"> <div className="preview-image img-5 flex column align-start justify-start"><h3>Dinner</h3><h4>parties</h4></div></Link>
          </div>
        </section>
        <section className="traditional">
          <section className="preview-header">
            <h2>Top Traditional Cuisine</h2>
          </section>
          <ExpList exps={this.getExps('tag-traditional')} />
          <Button className="traditional-button "><span> Show More  &gt;</span></Button>
        </section>

        <section className="tokyo-banner flex justify-center align-center">
          <div className="width-40"></div>
          <div>
            <h2> Eat real traditional</h2>
            <h2> sushi in <span>Tokyo</span></h2>
            <Button className="sushi-button" variant="contained" color="secondary">Show More</Button>
          </div>
        </section>
        <section className="tel-aviv">
          <section className="preview-header">
            <h2>Top Dinners in your Location</h2>
          </section>
          <ExpList exps={this.getExps('address-tel-aviv')} />
          <Button className="tel-aviv-button"><span> Show More &gt;</span></Button>
        </section>
        <section className="scenic">
          <section className="preview-header">
            <h2>Top Scenic Meals</h2>
          </section>
          <ExpList exps={this.getExps('tag-scenic')} />
          <Button className="scenic-button"><span> Show More &gt;</span></Button>
        </section>
        {/* <section className="multi-participants">
          <section className="preview-header">
            <h2>Top Multi-Participants Meals</h2>
          </section>
          <ExpList exps={this.getExps('capacity-multi')} />
          <Button><span> All Multi-Participants &gt;</span></Button>
        </section> */}
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
