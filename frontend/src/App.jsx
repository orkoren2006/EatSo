import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom'

import { Home } from './pages/Home.jsx';
import { LoginSignup } from './pages/Login.jsx';
import { About } from './pages/About.jsx';
import { ExpApp } from './pages/ExpApp.jsx';
import { ExpDetails } from './pages/ExpDetails.jsx';


export function App() {
  return (
    <div className="App">
      <Router>
        <nav>
          <Link to="/login">Login</Link> |
          <Link to="/">User Reviews</Link> |
          <Link to="/about">Chat Room</Link>
        </nav>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/exp" component={ExpApp} exact />
          <Route path="/exp/:id?" component={ExpDetails} exact />
          <Route path="/about" component={About} exact />
          <Route path="/login" component={LoginSignup} exact />
        </Switch>
      </Router>
    </div>
  );
}
