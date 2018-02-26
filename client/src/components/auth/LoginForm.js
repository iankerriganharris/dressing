// client/src/components/auth/LoginForm.js

import React, { Component } from 'react';
import { Button, Input, Form, Label, Divider } from 'semantic-ui-react';

class LoginForm extends Component {
  render() {
    return (
      <Form action='/login' method='post'>
        <Form.Field>
          <Input type="text" name="username" placeholder='Username'/>
        </Form.Field>
        <Form.Field>
          <Input type="password" name="password" placeholder='Password'/>
        </Form.Field>
        <Button>Login</Button>
      </Form>
    )
  }
}

export default LoginForm;
