// client/src/components/dashboard/DashboardScreen.js

import React, { Component } from 'react'
import { Button, Segment, Menu, Header, Sidebar, Icon, Image } from 'semantic-ui-react'
import ProfileScreen from '../profile/ProfileScreen';
import PostScreen from '../post/PostScreen';
import FollowScreen from '../follow/FollowScreen';

export default class DashboardScreen extends Component {
  state = {
    currentScreen: 'Home',
    currentFilter: 'others',
    currentPosts: [],
    followingPosts: [],
    visible: false,
    loggedIn: false,
  };

  componentWillMount() {
    this.refreshPosts();
  }

  refreshPosts = () => {
    this.callApi('/post')
    .then(res => this.setState({currentPosts: res}));
    this.callApi('/post/following')
    .then(res => this.setState({followingPosts: res}));
  };
  
  updateNav = (screen, filter='others') => {
    this.setState({
      currentScreen: screen,
      currentFilter: filter,
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

  toggleVisibility = () => this.setState({visible: !this.state.visible});

  render() {
    const currentScreen = this.state.currentScreen;
    const visible = this.state.visible;
    return(
      <div>
        <Menu pointing secondary>
          <Menu.Item name='home' active={currentScreen === 'Home'} 
            onClick={(e) => {this.updateNav('Home'); this.toggleVisibility();}}/>
          <Menu.Item name='follow' active={currentScreen === 'Follow'} onClick={(e) => this.updateNav('Follow')}/>
          <Menu.Menu position='right'>
            <Menu.Item name='profile' active={currentScreen === 'Profile'}
              onClick={(e) => this.updateNav('Profile')}/>
            <Menu.Item name='logout' active={currentScreen === 'logout'} onClick={this.props.logout}/>
          </Menu.Menu>
        </Menu>
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation='overlay' direction='top' visible={visible} inverted>
            <Menu.Item name='currentPosts' onClick={(e) => this.updateNav('Home', 'own')}>
              My Posts
            </Menu.Item>
            <Menu.Item name='followingPosts' onClick={(e) => this.updateNav('Home', 'others')}>
              Current Feed
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic>
              <Header as='h3'>Application Content</Header>
              {currentScreen === 'Home' ? (
                <PostScreen refreshPosts={this.refreshPosts} currentPosts={this.state.currentPosts}
                  followingPosts={this.state.followingPosts} currentFilter={this.state.currentFilter}/>
              ) : null}
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
        {currentScreen === 'Follow' ? (
          <FollowScreen />
        ) : currentScreen === 'Profile' ? (
          <ProfileScreen user={this.props.user} refreshUser={this.props.refreshUser}/>
        ) : null}
      </div>
    )
  }
}