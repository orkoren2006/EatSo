import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadReviews, addReview } from '../actions/reviewActions.js';
import { loadUsers } from '../actions/userActions.js';
import { Link } from 'react-router-dom';

class _Home extends Component {
  state = {
    reviewToEdit: {
      txt: '',
      aboutUserId: ''
    }
  };
  componentDidMount() {
    this.props.loadReviews();
    this.props.loadUsers();
  }

  handleChange = ev => {
    const { name, value } = ev.target;
    this.setState(prevState => ({
      reviewToEdit: {
        ...prevState.reviewToEdit,
        [name]: value
      }
    }));
  };

  addReview = ev => {
    ev.preventDefault();
    this.props.addReview(this.state.reviewToEdit);
    this.setState({ reviewToEdit: { txt: '', aboutUserId: '' } });
  };

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
    reviews: state.review.reviews,
    users: state.user.users,
    loggedInUser: state.user.loggedInUser
  };
};
const mapDispatchToProps = {
  loadReviews,
  loadUsers,
  addReview
};

export const Home =  connect(mapStateToProps, mapDispatchToProps)(_Home);
