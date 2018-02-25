// client/src/components/auth/LoginForm.js

import React, { Component } from 'react';

class LoginForm extends Component {

  // handleSubmit = async (event, endpoint) => {
  //   event.preventDefault();
  //   const data = new FormData(event.target);
  //   // data.append('username', event.target.username.value);
  //   // data.append('password', event.target.password.value);
  //   console.log(data);
  //   const response = await fetch(endpoint, {
  //     method: 'POST',
  //     credentials: 'include',
  //     body: JSON.stringify(data),
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //       },
  //   });
  //   console.log(response);
  // };

  // action='/login' method='post'
  // onSubmit={(e) => this.handleSubmit(e, '/login')

  render() {
    return (
      <div>
        <form action='/login' method='post'>
          <div>
            <label>Username</label>
            <input type="text" name="username" />
          </div>
          <div>
            <label>Password</label>
            <input type="password" name="password" />
          </div>
          <button>Login</button>
        </form>
        <hr />
      </div>
    )
  }
}

export default LoginForm;
