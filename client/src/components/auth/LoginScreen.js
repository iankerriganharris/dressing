// client/src/components/auth/LoginScreen.js
// Reference: https://stackoverflow.com/questions/34078033/switching-between-components-in-react-js

import React, { Component } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

class LoginScreen extends Component {

  componentWillMount() {
    this.setState( {
      activeForm: 'LOGIN'
    })
  };

  handleClick = requestedForm => {
    this.setState({
      activeForm: requestedForm
    })
  };

  render() {
    var activeForm = this.state.activeForm;
    return (
      <div>
        {activeForm === 'LOGIN' ? (
          <div>
            <LoginForm />
            <button type="button" onClick={(e) => this.handleClick('SIGNUP')}>Signup</button>
          </div>
        ) : activeForm === 'SIGNUP' ? (
          <div>
            <SignupForm />
            <button type="button" onClick={(e) => this.handleClick('LOGIN')}>Back to Login</button>
            </div>
        ) : null
        }
        
      </div>
    );
  }
}

export default LoginScreen
