// client/src/components/dashboard/DashboardScreen.js

import React, { Component } from 'react'
import { Button, Segment, Menu, Header, Sidebar } from 'semantic-ui-react'
import ProfileScreen from '../profile/ProfileScreen';
import PostScreen from '../post/PostScreen';

export default class DashboardScreen extends Component {
  state = {
    currentScreen: 'Home',
    currentPosts: [],
    visible: false,
    loggedIn: false,
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

  toggleVisibility = () => this.setState({visible: !this.state.visible})

  render() {
    const currentScreen = this.state.currentScreen;
    const visible = this.state.visible;
    return(
      <div>
        <Menu pointing secondary>
          <Menu.Item name='home' active={currentScreen === 'Home'} onClick={(e) => this.updateNav('Home')}/>
          <Menu.Item name='profile' active={currentScreen === 'Profile'} onClick={(e) => this.updateNav('Profile')}/>
          <Menu.Menu position='right'>
            <Menu.Item name='logout' active={currentScreen === 'logout'} onClick={this.props.logout}/>
          </Menu.Menu>
        </Menu>
        {currentScreen === 'Home' ? (
          <PostScreen refreshPosts={this.refreshPosts} currentPosts={this.state.currentPosts}/>
        ) : currentScreen === 'Profile' ? (
          <ProfileScreen user={this.props.user} refreshUser={this.props.refreshUser}/>
        ) : null}
      </div>
    )
  }
}