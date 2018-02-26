// client/src/components/auth/LoginScreen.js
// Reference: https://stackoverflow.com/questions/34078033/switching-between-components-in-react-js

import React, { Component } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { Button, Segment, Divider, Grid } from 'semantic-ui-react';

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
      <Grid centered>
        <Grid.Row>
        {activeForm === 'LOGIN' ? (
          <Grid.Column textAlign='centered' width={4}>
            <LoginForm />
            <Divider horizontal></Divider>
            <Button type="button" onClick={(e) => this.handleClick('SIGNUP')}>Signup</Button>
          </Grid.Column>
        ) : activeForm === 'SIGNUP' ? (
          <Grid.Column textAlign='centered' width={4}>
            <SignupForm />
            <Divider horizontal></Divider>
            <Button type="button" onClick={(e) => this.handleClick('LOGIN')}>Back to Login</Button>
          </Grid.Column>
        ) : null
        }
        </Grid.Row>
      </Grid>
    );
  }
}

export default LoginScreen
