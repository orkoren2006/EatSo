import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom'

import { Home } from './pages/Home.jsx';
import { LoginSignup } from './pages/LoginSignup.jsx';
import { About } from './pages/About.jsx';
import { ExpApp } from './pages/ExpApp.jsx';
import { ExpDetails } from './pages/ExpDetails.jsx';
import { ExpEdit } from './pages/ExpEdit.jsx';
import { Header } from './cmps/Header.jsx';
import { HostDetails } from './pages/HostDetails.jsx';
import { UserExp } from './pages/UserExp.jsx';
import { socketService } from './services/socketService.js';


export class App extends Component {
  componentDidMount() {
    socketService.setup();
  }
  componentWillUnmount() {
    socketService.terminate();
  }
  
  render() {
    return (
      <div className="app main-container">
        <Router>
          <Header />
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/exp/edit/:id?" component={ExpEdit} exact />
            <Route path="/exp/:id" component={ExpDetails} exact />
            {/* <Route path="/host/:id" component={HostDetails} exact /> */}
            <Route path="/myexp/:as" component={UserExp} exact />
            <Route path="/exp/:field?/:value?" component={ExpApp} />
            {/* <Route path="/exp" component={ExpApp} /> */}
            <Route path="/about" component={About} exact />
            <Route path="/login" component={LoginSignup} exact />
          </Switch>
        </Router>
      </div>

    );
  }
}
