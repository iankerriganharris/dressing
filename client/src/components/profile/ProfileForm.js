// client/src/components/profile/ProfileForm.js

import React, { Component } from 'react';

export default class ProfileForm extends Component {
  
  render() {
    return(
      <form onSubmit={(e) => this.props.handleSubmit(e, '/profile')}>
        <label>First name</label>
        <input type='text' name='firstName' defaultValue={this.props.user.firstName}/><br/>
        <label>Last name</label>
        <input type='text' name='lastName' defaultValue={this.props.user.lastName}/><br/>
        <label>Email</label>
        <input type='text' name='email' defaultValue={this.props.user.email}/><br/>
        <label>Address</label>
        <input type='text' name='address' defaultValue={this.props.user.address}/><br/>
        <label>Postal Code</label>
        <input type='text' name='zipCode' defaultValue={this.props.user.zipCode}/><br/>
        <button>Save</button>
      </form>
    )
  }
}
