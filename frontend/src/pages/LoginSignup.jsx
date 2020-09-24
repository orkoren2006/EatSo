import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { ExpFilter } from '../cmps/ExpFilter';
import { socketService } from '../services/socketService';

import {
  loadUsers,
  removeUser,
  login,
  logout,
  signup
} from '../store/actions/userActions';

class _LoginSignup extends Component {
  state = {
    isLoggedIn: true,
    msg: '',
    loginCred: {
      email: '',
      password: ''
    },
    signupCred: {
      email: '',
      password: '',
      username: ''
    }
  };


  async componentDidMount() {
    // await this.props.loadUsers()
    // console.log('from login' ,this.props.users);
    // this.setState({ users }, () => console.log(this.state.users))
    
  }

  loginHandleChange = ev => {
    const { name, value } = ev.target;
    this.setState(prevState => ({
      loginCred: {
        ...prevState.loginCred,
        [name]: value
      }
    }));
  };

  signupHandleChange = ev => {
    const { name, value } = ev.target;
    this.setState(prevState => ({
      signupCred: {
        ...prevState.signupCred,
        [name]: value
      }
    }));
  };

  doLogin = async ev => {
    ev.preventDefault();
    const { email, password } = this.state.loginCred;
    if (!email || !password) {
      return this.setState({ msg: 'Please enter user/password' });
    }
    const userCreds = { email, password };
    try {
      this.setState({isLoggedIn: true}) //switch with 66 if needed 
      await this.props.login(userCreds);
      socketService.emit('user login', this.props.loggedInUser._id)
      // this.setState({ loginCred: { email: '', password: '' }, isLoggedIn: true }, () => {
        if (this.props.edit) this.props.history.push('/exp/edit')
        else if (this.props.onCloseModal) this.props.onCloseModal();
        else this.props.history.push('/')
      // });

    } catch (err) {
      console.log('failed to login', err);
      this.setState({ isLoggedIn: false })
    }
  };

  doSignup = async ev => {
    ev.preventDefault();
    const { email, password, username } = this.state.signupCred;
    if (!email || !password || !username) {
      return this.setState({ msg: 'All inputs are required!' });
    }
    const signupCreds = { email, password, username };
    this.props.signup(signupCreds);
    this.setState({ signupCred: { email: '', password: '', username: '' } });
  };

  removeUser = userId => {
    this.props.removeUser(userId);
  };

  render() {
    let signupSection = (
      <form onSubmit={this.doSignup}>
        <input
          type="text"
          name="email"
          value={this.state.signupCred.email}
          onChange={this.signupHandleChange}
          placeholder="Email"
        />
        <br />
        <input
          name="password"
          type="password"
          value={this.state.signupCred.password}
          onChange={this.signupHandleChange}
          placeholder="Password"
        />
        <br />
        <input
          type="text"
          name="username"
          value={this.state.signupCred.username}
          onChange={this.signupHandleChange}
          placeholder="Username"
        />
        <br />
        <button>Signup</button>
      </form>
    );
    let loginSection = (
      <form onSubmit={this.doLogin}>
        <input
          type="text"
          name="email"
          value={this.state.loginCred.email}
          onChange={this.loginHandleChange}
          placeholder="Email"
        />
        <br />
        <input
          type="password"
          name="password"
          value={this.state.loginCred.password}
          onChange={this.loginHandleChange}
          placeholder="Password"
        />
        <br />
        <button>Login</button>
      </form>
    );

    const { loggedInUser } = this.props;

    return (
      <div className="test">
        <h1>
          Login
        </h1>
        <h2>{this.state.msg}</h2>
        {loggedInUser && (
          <div>
            <h2>Welcome: {loggedInUser.username} </h2>
            <button onClick={this.props.logout}>Logout</button>
          </div>
        )}
        {!loggedInUser && loginSection}
        {!this.state.isLoggedIn && <h3>Login Failed!</h3>}
        <hr />
        <h1>
          Sign Up
        </h1>
        {!loggedInUser && signupSection}
        {/* <ExpFilter/> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.user.users,
    loggedInUser: state.user.loggedInUser,
    isLoading: state.system.isLoading
  };
};
const mapDispatchToProps = {
  login,
  logout,
  signup,
  removeUser,
  loadUsers
};

export const LoginSignup = connect(mapStateToProps, mapDispatchToProps)(withRouter(_LoginSignup));
