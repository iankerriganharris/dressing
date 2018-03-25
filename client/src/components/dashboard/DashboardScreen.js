// client/src/components/dashboard/DashboardScreen.js

import React, { Component } from 'react'
import { PostFilter } from '../common/filters'
import InlineFilter from '../InlineFilter'
import { Button, Segment, Menu, Header, Sidebar, Icon, Image, Container, Dropdown, Label, Grid } from 'semantic-ui-react'
import ProfileScreen from '../profile/ProfileScreen';
import PostScreen from '../post/PostScreen';
import PostForm from '../post/PostForm';
import DISCOVERForm from '../follow/FollowForm';
import SearchBar from '../search/SearchBar';

export default class DashboardScreen extends Component {
  state = {
    currentScreen: 'TIMELINE',
    currentFilter: RegExp(/./),
    postFilters: ['everyone', 'me', 'people I follow'],
    currentPosts: [],
    DISCOVERingPosts: [],
    timeline: [],
    filteredTimeline: null,
    visible: true,
    loggedIn: false,
    otherProfile: null,
    postSuccess: null,
  };

  componentWillMount() {
    this.refreshPosts();
  }

  refreshPosts = () => {
    this.callApi('/post/timeline')
    .then(res => this.setState({timeline: res}));
  };

  goToProfile = (username) => {
    if (username == this.props.user.username) {
      this.updateNav('PROFILE');
    } else {
      this.callApi(`/profile/${username}`)
      .then(res => {this.otherProfile = res.rows[0],
        this.setState({otherProfile: res.rows[0]},
          this.updateNav('OTHERPROFILE')
        )
        }
      )
    }
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
    if(this.state.currentScreen === 'TIMELINE') {
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
    .then(this.handleClick)
    .then(this.setState({postSuccess: true}))
    .then(setTimeout(function() {this.setState({postSuccess: null});}.bind(this), 5000));
  };

  applyFilter = (filter) => {
    console.log(filter)
    if(filter === 'me') {
      this.setState({currentFilter: 'me'});
      let filteredTimeline = this.state.timeline.filter(post => RegExp(this.props.user.username).test(post.username))
      this.setState({filteredTimeline: filteredTimeline});
    } else if(filter === 'people I follow') {
      this.setState({currentFilter: 'people I follow'});
      let filteredTimeline = this.state.timeline.filter(post => !RegExp(this.props.user.username).test(post.username))
      this.setState({filteredTimeline: filteredTimeline});
    } else {
      this.setState({currentFilter: 'everyone'})
      this.setState({filteredTimeline: null});
      console.log('Filter action not defined. Displaying everyone.')
    }
    
  }

  render() {
    const currentScreen = this.state.currentScreen;
    const visible = this.state.visible;
    const resultRenderer = ({ title }) => <Label content={title} />
    return(
      <div>
        <Grid>
          <Grid.Column>
            <Menu fixed='top'>
              <Menu.Menu position='left'>
                <Menu.Item name='Timeline' active={currentScreen === 'TIMELINE' || currentScreen === 'OTHERPROFILE'} 
                  onClick={(e) => {this.updateNav('TIMELINE')}}/>
                  <Menu.Item name='Discover' active={currentScreen === 'DISCOVER'}
                    onClick={(e) => {this.updateNav('DISCOVER')}}/>
                </Menu.Menu>
                <SearchBar size='tiny' minCharacters={3} goToProfile={this.goToProfile}/>
                <Menu.Menu position='right'>
                  <Menu.Item name='profile' active={currentScreen === 'PROFILE'}
                    onClick={(e) => this.updateNav('PROFILE')}/>
                  <Menu.Item name='logout' active={currentScreen === 'LOGOUT'} onClick={this.props.logout}/>
                </Menu.Menu>
              </Menu>
          <Grid padded>
          {currentScreen === 'TIMELINE' ? (
            <Grid.Column>
              <Grid.Row>
                <PostForm postSuccess={this.state.postSuccess} handleSubmit={this.handleSubmit}/>
              </Grid.Row>
              <Grid.Row>
                <Segment basic>
                  <InlineFilter filterObject={PostFilter} applyFilter={this.applyFilter}/>
                </Segment>
              </Grid.Row>
              <Grid.Row >
                <Segment basic color='yellow'>
                  <PostScreen refreshPosts={this.refreshPosts} currentFilter={this.state.currentFilter}
                    goToProfile={this.goToProfile} newPost={this.state.newPost} timeline={this.state.timeline}
                    filteredTimeline={this.state.filteredTimeline} handleSubmit={this.handleSubmit}
                    />
                </Segment>
              </Grid.Row>
            </Grid.Column>
          ) : currentScreen === 'DISCOVER' ? (
            <Grid.Column>
              <DISCOVERForm />
            </Grid.Column>
          ) : currentScreen === 'PROFILE' ? (
            <Grid.Column>
              <ProfileScreen user={this.props.user} refreshUser={this.props.refreshUser} canEdit={true}/>
            </Grid.Column>
          ) : currentScreen === 'OTHERPROFILE' ? (
            <Grid.Column>
              <ProfileScreen user={this.otherProfile} canEdit={false}/>
            </Grid.Column>
          ) : null}
          </Grid>
          </Grid.Column>        
        </Grid>
        <Menu fixed='bottom'>
          <Menu.Item name='Footer Item'/>
        </Menu>
      </div>
    )
  }
}