// client/src/components/dashboard/DashboardScreen.js

import React, { Component } from 'react';
import ProfileScreen from '../profile/ProfileScreen';
import PostScreen from '../post/PostScreen';

export default class DashboardScreen extends Component {
  state = {
    currentScreen: '',
    currentPosts: [],
  };

  componentWillMount() {
    this.refreshPosts();
  }

  refreshPosts = () => {
    this.callApi('/post')
    .then(res => this.setState({currentPosts: res}));
  };
  
  updateNav = (screen) => {
    this.setState({
      currentScreen: screen,
    });
  };

  callApi = async (endpoint) => {
    const response = await fetch(endpoint, {
      credentials: 'include',
    });
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    const currentScreen = this.state.currentScreen;
    return(
      <div>
        <button onClick={(e) => this.updateNav('DASHBOARD')}>Dashboard</button>
        <button onClick={(e) => this.updateNav('PROFILE')}>Profile</button>
        <PostScreen refreshPosts={this.refreshPosts} currentPosts={this.state.currentPosts}/>
        {currentScreen === 'PROFILE' ? (
          <ProfileScreen user={this.props.user} refreshUser={this.props.refreshUser}/>
        ) : null}
      </div>
    )
  }
}