import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom'

import { Home } from './pages/Home.jsx';
import { LoginSignup } from './pages/Login.jsx';
import { About } from './pages/About.jsx';


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
          <Route path="/about" component={About} exact />
          <Route path="/login" component={LoginSignup} exact />
          {/* <Route path="/" component={About} exact/> */}
          {/* <Route path="/" component={Home} exact/> */}
        </Switch>
      </Router>
    </div>
  );
}
