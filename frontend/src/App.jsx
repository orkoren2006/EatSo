import React from 'react';
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


export function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/exp/edit/:id?" component={ExpEdit} exact />
          <Route path="/exp/:id" component={ExpDetails} exact />
          <Route path="/exp" component={ExpApp} exact />
          <Route path="/host/:id" component={HostDetails} exact />
          <Route path="/user/:id/exp" component={UserExp} exact />
          <Route path="/about" component={About} exact />
          <Route path="/login" component={LoginSignup} exact />
        </Switch>
      </Router>
    </div>
  );
}
