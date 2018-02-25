// client/src/components/profile/ProfileScreen.js

import React, { Component } from 'react';
import ProfileForm from './ProfileForm';

export default class ProfileScreen extends Component {

  componentWillMount() {
    this.setState( {
      editProfile: false,
    })
  };

  handleClick = () => {
    if (this.state.editProfile) {
      this.setState({
        editProfile: false,
      })
    } else {
      this.setState({
        editProfile: true,
      })
    }
  };

  handleSubmit = async (event, endpoint) => {
    event.preventDefault();
    const form = new FormData(event.target);
    await fetch(endpoint, {
      method: 'POST',
      credentials: 'include',
      body: form,
    })
    .then(this.props.refreshUser)
    .then(this.handleClick);
  };

  render() {
    const editProfile = this.state.editProfile;
    return(
      <div>
        {editProfile ? (
          <div>
            <ProfileForm user={this.props.user} handleSubmit={this.handleSubmit}/>
            <button onClick={this.handleClick}>Cancel</button>
          </div>
        ) :
          <div>
            <label>First name: </label>{this.props.user.firstName}<br/>
            <label>Last name: </label>{this.props.user.lastName}<br/>
            <label>Email: </label>{this.props.user.email}<br/>
            <label>Address: </label>{this.props.user.address}<br/>
            <label>Postal code: </label>{this.props.user.zipCode}<br/>
            <button onClick={this.handleClick}>Edit profile</button>
          </div>}
      </div>
    )
  }
}
