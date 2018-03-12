// client/src/components/post/PostScreen.js

import React, { Component } from 'react';
import PostForm from './PostForm';
import { Button, Container, Feed, Segment } from 'semantic-ui-react';

export default class PostScreen extends Component {

  componentWillMount() {
    this.setState( {
      newPost: false,
    });
  };

  handleClick = () => {
    if (this.state.newPost) {
      this.setState({
        newPost: false,
      })
    } else {
      this.setState({
        newPost: true,
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
    .then(this.props.refreshPosts)
    .then(this.handleClick);
  };

  setTimeline = () => {
    if( this.props.filteredTimeline !== null) {
      return this.props.filteredTimeline;
    } else {
      return this.props.timeline;
    }
  }

  render() {
    const newPost = this.props.newPost;
    const filterPosts = this.props.currentFilter;
    const goToProfile = this.props.goToProfile;
    const timeline = this.setTimeline();
    return(
      <div>
        {timeline ? (
            <Feed>{timeline.map(post => (
              <Feed.Event>
                <Feed.Content>
                  <Feed.Summary key={post.id}>
                    <Feed.User onClick={(e) => goToProfile(post.username)}>{post.username}</Feed.User>
                    <Feed.Date>{post.date}</Feed.Date>
                  </Feed.Summary>
                  <Feed.Extra text>
                    {post.description}
                  </Feed.Extra>
                </Feed.Content>
              </Feed.Event>
          ))}</Feed>
        ) : null}
      </div>
    )
  }
}