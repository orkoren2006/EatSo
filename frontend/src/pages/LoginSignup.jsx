import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ExpChat } from '../cmps/ExpChat';

import {
  loadUsers,
  removeUser,
  login,
  logout,
  signup
} from '../store/actions/userActions';

class _LoginSignup extends Component {
  state = {
    users: [],
    msg: '',
    loginCred: {
      email: '',
      password: ''
    },
    signupCred: {
      email: '',
      password: '',
      userName: ''
    }
  };


  async componentDidMount() {
    await this.props.loadUsers()
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
    this.props.login(userCreds);
    this.setState({ loginCred: { email: '', password: '' } });
  };

  doSignup = async ev => {
    ev.preventDefault();
    const { email, password, userName } = this.state.signupCred;
    if (!email || !password || !userName) {
      return this.setState({ msg: 'All inputs are required!' });
    }
    const signupCreds = { email, password, userName };
    this.props.signup(signupCreds);
    this.setState({ signupCred: { email: '', password: '', userName: '' } });
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
          name="userName"
          value={this.state.signupCred.userName}
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
    // if (loggedInUser) {const { userName } = loggedInUser}

    return (
      <div className="test">
        <h1>
          Login
        </h1>
        <h2>{this.state.msg}</h2>
        {loggedInUser && (
          <div>
            <h2>Welcome: {loggedInUser.userName} </h2>
            <button onClick={this.props.logout}>Logout</button>
          </div>
        )}
        {!loggedInUser && loginSection}
        <hr />
        <h1>
          Sign Up
        </h1>
        {!loggedInUser && signupSection}

        {loggedInUser && <ExpChat userName={loggedInUser.userName}/>}
        {/* <h2>Login</h2>
        <form>div</form>

        <h2>Signup</h2>
        <form></form> */}



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

export const LoginSignup = connect(mapStateToProps, mapDispatchToProps)(_LoginSignup);
