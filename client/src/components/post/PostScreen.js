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

  render() {
    const newPost = this.props.newPost;
    const currentPosts = this.props.currentPosts;
    const followingPosts = this.props.followingPosts;
    const filterPosts = this.props.currentFilter;
    const goToProfile = this.props.goToProfile;
    return(
      <div>
        {currentPosts && filterPosts === 'own' ? (
          <Feed>{currentPosts.map(post => (
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
        ) : followingPosts && filterPosts === 'others' ? (
          <Feed>{followingPosts.map(post => (
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