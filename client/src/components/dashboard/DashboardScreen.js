// client/src/components/dashboard/DashboardScreen.js

import React, { Component } from 'react'
import { Button, Segment, Menu, Header, Sidebar, Icon, Image } from 'semantic-ui-react'
import ProfileScreen from '../profile/ProfileScreen';
import PostScreen from '../post/PostScreen';
import PostForm from '../post/PostForm';
import FollowForm from '../follow/FollowForm';

export default class DashboardScreen extends Component {
  state = {
    currentScreen: 'HOME',
    currentFilter: 'others',
    currentPosts: [],
    followingPosts: [],
    timeline: [],
    visible: true,
    loggedIn: false,
    otherProfile: null,
  };

  componentWillMount() {
    this.refreshPosts();
  }

  refreshPosts = () => {
    this.callApi('/post/timeline')
    .then(res => this.setState({timeline: res}));
  };

  goToProfile = (username) => {
    this.callApi(`/profile/${username}`)
    .then(res => {this.otherProfile = res.rows[0],
      this.setState({otherProfile: res.rows[0]},
        this.updateNav('OTHERPROFILE')
      )
      }
    )
  }
  
  updateNav = (screen, filter='others') => {
    this.setState({
      currentScreen: screen,
      currentFilter: filter,
    }, this.toggleVisibility);
  };

  callApi = async (endpoint) => {
    const response = await fetch(endpoint, {
      credentials: 'include',
    });
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  toggleVisibility = (elem) => {
    if(this.state.currentScreen === 'HOME') {
      this.setState({visible: true});
    } else {
      this.setState({visible: false});
      // this.setState({visible: !this.state.visible});
    }
  }

  handleClick = () => {
    this.setState({newPost: !this.state.newPost})
  }

  handleSubmit = async (event, endpoint) => {
    event.preventDefault();
    const form = new FormData(event.target);
    await fetch(endpoint, {
      method: 'POST',
      credentials: 'include',
      body: form,
    })
    .then(this.refreshPosts)
    .then(this.handleClick);
  };

  render() {
    const currentScreen = this.state.currentScreen;
    const visible = this.state.visible;
    return(
      <div>
        <Menu pointing secondary>
          <Menu.Item name='home' active={currentScreen === 'HOME'} 
            onClick={(e) => {this.updateNav('HOME')}}/>
          <Menu.Item name='follow' active={currentScreen === 'FOLLOW'}
            onClick={(e) => {this.updateNav('FOLLOW')}}/>
          <Menu.Menu position='right'>
            <Menu.Item name='profile' active={currentScreen === 'PROFILE'}
              onClick={(e) => this.updateNav('PROFILE')}/>
            <Menu.Item name='logout' active={currentScreen === 'LOGOUT'} onClick={this.props.logout}/>
          </Menu.Menu>
        </Menu>
        {currentScreen === 'HOME' ? (
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation='overlay' direction='top' visible={visible} inverted>
            <Menu.Item name='newPost' onClick={this.handleClick}>
              New Post
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            <Segment attached='top'></Segment>
            <Segment attached>
              {this.state.newPost ? (
              <Segment attached>
                <PostForm user={this.props.user} handleSubmit={this.handleSubmit}/>
                <Button onClick={this.handleClick}>Cancel</Button>
              </Segment>
              ) : null }
              <PostScreen refreshPosts={this.refreshPosts} currentFilter={this.state.currentFilter}
                goToProfile={this.goToProfile} newPost={this.state.newPost} timeline={this.state.timeline}/>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
        ) : currentScreen === 'FOLLOW' ? (
          <FollowForm />
        ) : currentScreen === 'PROFILE' ? (
          <ProfileScreen user={this.props.user} refreshUser={this.props.refreshUser}/>
        ) : currentScreen === 'OTHERPROFILE' ? (
          <ProfileScreen user={this.otherProfile}/>
        ) : null}
      </div>
    )
  }
}