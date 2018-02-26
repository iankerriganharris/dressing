// client/src/components/auth/SignupForm.js

import React, { Component } from 'react';
import { Button, Input, Form, Label } from 'semantic-ui-react';

class SignupForm extends Component {
  render() {
    return (
      <Form action="/signup" method="post">
        <Form.Field>
          <Input type="text" name="username" placeholder='Username'/>
        </Form.Field>
        <Form.Field>
          <Input type="password" name="password" placeholder='Password'/>
        </Form.Field>
        <Button type="submit">Signup</Button>
      </Form>   
    )
  }
}

export default SignupForm;