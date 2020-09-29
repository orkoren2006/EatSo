import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import { Home } from './pages/Home.jsx';
import { LoginSignup } from './pages/LoginSignup.jsx';
import { About } from './pages/About.jsx';
import { ExpApp } from './pages/ExpApp.jsx';
import { ExpDetails } from './pages/ExpDetails.jsx';
import { ExpEdit } from './pages/ExpEdit.jsx';
import { Header } from './cmps/Header.jsx';
import { Footer } from './cmps/Footer.jsx';
import { Notification } from './cmps/Notification';
import { HostDetails } from './pages/HostDetails.jsx';
import { UserExp } from './pages/UserExp.jsx';
import { socketService } from './services/socketService.js';
import { clearNotification, sendNotification } from './store/actions/systemActions.js';
import { connect } from 'react-redux';
import { getExpById } from './store/actions/expAction.js';
// import { ExpEditTest } from './pages/ExpEditTest.jsx';


class _App extends Component {
  componentDidMount() {
    socketService.setup();
    socketService.on('booking status msg', this.onBookingStatusChange); // after host of exp approved/rejected the booking - notification to the user
    socketService.on('new booking', this.onNewBooking) // after user booked to exp - notification to the host
  }
  componentWillUnmount() {
    socketService.off('booking status msg', this.onBookingStatusChange);
    socketService.terminate();
  }

  onBookingStatusChange = async (booking) => {
    console.log('onBookingStatusChange in App.jsx');
    const msg = `booking "${booking.exp.name}" ${booking.status}\nCheck it in your private zone`
    // const msg = `booking ${booking._id} ${booking.status}\nCheck it in your private zone`
    this.props.sendNotification({msg, isSuccessed: booking.status === 'approved'});
    setTimeout(this.props.clearNotification, 5000) ;
  }

  onNewBooking = () => {
    console.log('onNewBooking in App.jsx');
    const msg = 'new booking is pending\nCheck it in your private zone'
    this.props.sendNotification({msg, isSuccessed: true});
    setTimeout(this.props.clearNotification, 5000) 
  }

  render() {
    return (
      <div className="app main-container">
        <Router>
          <Header />
          <Notification />
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/exp/edit/:id?" component={ExpEdit} exact />
            <Route path="/exp/:id" component={ExpDetails} exact />
            <Route path="/host/:id" component={HostDetails} exact />
            <Route path="/myexp/:as" component={UserExp} exact />
            <Route path="/exp" component={ExpApp} />
            <Route path="/about" component={About} exact />
            <Route path="/login" component={LoginSignup} exact />
          </Switch>
          <Footer />
        </Router>
      </div>

    );
  }
}

const mapStateToProps = state => {
  return {

  };
};

const mapDispatchToProps = {
  sendNotification,
  clearNotification,
  getExpById
};

export const App = connect(mapStateToProps, mapDispatchToProps)(_App);