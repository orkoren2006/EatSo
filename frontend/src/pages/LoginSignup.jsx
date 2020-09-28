import { Button } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
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
    isLoginSection: true,
    msg: '',
    loginCred: {
      email: '',
      password: ''
    },
    signupCred: {
      email: '',
      password: '',
      username: '',
      fullName: ''
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
      this.setState({ isLoggedIn: true }) //switch with 66 if needed 
      await this.props.login(userCreds);
      socketService.emit('user login', this.props.loggedInUser._id)
      // this.setState({ loginCred: { email: '', password: '' }, isLoggedIn: true }, () => {
      if (this.props.edit) this.props.history.push('/exp/edit')
      else if (this.props.onCloseModal) this.props.onCloseModal();
      else this.props.history.push('/')
      // });

    } catch (err) {
      console.log('failed to login', err);
      this.setState({loginCred: { ...this.state.loginCred, password: '' } ,isLoggedIn: false })
    }
  };

  doSignup = async ev => {
    ev.preventDefault();
    const { email, password, username, fullName } = this.state.signupCred;
    if (!email || !password || !username || !fullName) {
      return this.setState({ msg: 'All inputs are required!' });
    }
    const signupCreds = { email, password, username, fullName };
    this.props.signup(signupCreds);
    this.setState({ signupCred: { email: '', password: '', username: '', fullName: '' } });
  };

  removeUser = userId => {
    this.props.removeUser(userId);
  };

  onSigninTypeBtn = () => {
    this.setState({ isLoginSection: !this.state.isLoginSection })
  }

  render() {
    let signupSection = (
      <form className="flex column" onSubmit={this.doSignup}>
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
        <input
          type="text"
          name="fullName"
          value={this.state.signupCred.fullName}
          onChange={this.signupHandleChange}
          placeholder="Full Name"
        />
        <br />
        <button className="signin-btn">Create Account</button>
      </form>
    );
    let loginSection = (
      <form className="flex column" onSubmit={this.doLogin}>
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
        <button className="signin-btn">Sign in</button>
      </form>
    );

    const { loggedInUser } = this.props;
    const { isLoginSection } = this.state;

    return (
      <div>
        <section className="login-signup flex column justify-center align-center">
          <h1>
            {(isLoginSection) ? 'Login':'Create your account'}
        </h1>
          {/* <h2>{this.state.msg}</h2>
        {loggedInUser && (
          <div>
            <h2>Welcome: {loggedInUser.username} </h2>
            <button onClick={this.props.logout}>Logout</button>
          </div>
        )} */}
          {/* {!loggedInUser && loginSection} */}
          {(!loggedInUser && this.state.isLoginSection) ? loginSection : signupSection}

          {/* <hr />
          <h1>
            Sign Up
        </h1>
          {!loggedInUser && signupSection} */}
        </section>
        <section className="login-signup-btn flex column justify-center align-center">
            {(!this.state.isLoginSection) && <h6>Already have an account?</h6> }
          <Button onClick={this.onSigninTypeBtn} variant="contained" color="primary">
            {(this.state.isLoginSection) ? 'Create an account' : 'Sign in'}
          </Button>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.user.users,
    loggedInUser: state.user.loggedInUser,
    isLoading: state.system.isLoading,
    notification: state.system
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
