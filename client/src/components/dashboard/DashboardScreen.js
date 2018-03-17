// client/src/components/dashboard/DashboardScreen.js

import React, { Component } from 'react'
import { PostFilter } from '../common/filters'
import InlineFilter from '../InlineFilter'
import { Button, Segment, Menu, Header, Sidebar, Icon, Image, Container, Dropdown, Label } from 'semantic-ui-react'
import ProfileScreen from '../profile/ProfileScreen';
import PostScreen from '../post/PostScreen';
import PostForm from '../post/PostForm';
import FollowForm from '../follow/FollowForm';
import SearchBar from '../search/SearchBar';

export default class DashboardScreen extends Component {
  state = {
    currentScreen: 'HOME',
    currentFilter: RegExp(/./),
    postFilters: ['everyone', 'me', 'people I follow'],
    currentPosts: [],
    followingPosts: [],
    timeline: [],
    filteredTimeline: null,
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

  applyFilter = (filter) => {
    console.log(filter)
    if(filter === 'me') {
      // this.setState({currentFilter: RegExp(this.props.user.username)});
      let filteredTimeline = this.state.timeline.filter(post => RegExp(this.props.user.username).test(post.username))
      this.setState({filteredTimeline: filteredTimeline});
    } else if(filter === 'people I follow') {
      // this.setState({currentFilter: RegExp(/./)});
      let filteredTimeline = this.state.timeline.filter(post => !RegExp(this.props.user.username).test(post.username))
      this.setState({filteredTimeline: filteredTimeline});
    } else {
      // let filteredTimeline = this.state.timeline.filter(post => RegExp(/./).test(post.username))
      this.setState({filteredTimeline: this.state.timeline});
      console.log('Filter action not defined. Displaying everyone.')
    }
    
  }

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
        <SearchBar />
        {currentScreen === 'HOME' ? (
          <Segment.Group>
            <Segment top><InlineFilter filterObject={PostFilter} applyFilter={this.applyFilter}/></Segment>
            <Segment.Group>
                <Segment basic>
                  <PostScreen refreshPosts={this.refreshPosts} currentFilter={this.state.currentFilter}
                    goToProfile={this.goToProfile} newPost={this.state.newPost} timeline={this.state.timeline}
                    filteredTimeline={this.state.filteredTimeline}
                    />
                </Segment>
            </Segment.Group>
          </Segment.Group>
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