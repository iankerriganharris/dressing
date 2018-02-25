// client/src/components/auth/SignupForm.js

import React, { Component } from 'react';

class SignupForm extends Component {
  render() {
    return (
      <div>
        <form action="/signup" method="post">
          <div>
            <label>Username</label>
            <input type="text" name="username" />
          </div>
          <div>
            <label>Password</label>
            <input type="password" name="password" />
          </div>
          <button type="submit">Signup</button>
        </form>
        <hr />
      </div>        
    )
  }
}

export default SignupForm;