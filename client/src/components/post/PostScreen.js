// client/src/components/post/PostScreen.js

import React, { Component } from 'react';
import PostForm from './PostForm';
import { Button, Container, Feed } from 'semantic-ui-react';

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
    const newPost = this.state.newPost;
    const currentPosts = this.props.currentPosts;
    const followingPosts = this.props.followingPosts;
    const filterPosts = this.props.currentFilter;
    return(
      <div>
        {newPost ? (
          <div>
            <PostForm user={this.props.user} handleSubmit={this.handleSubmit}/>
            <Button onClick={this.handleClick}>Cancel</Button>
          </div>
        ) :
          <Button onClick={this.handleClick}>New post</Button>}
        {currentPosts && filterPosts === 'own' ? (
          <Feed>{currentPosts.map(post => (
            <Feed.Content>
              <Feed.Summary key={post.id}>{post.description}</Feed.Summary>
            </Feed.Content>
          ))}</Feed>
        ) : followingPosts && filterPosts === 'others' ? (
          <Feed>{followingPosts.map(post => (
            <Feed.Content>
              <Feed.Summary key={post.id}>{post.description}</Feed.Summary>
            </Feed.Content>
          ))}</Feed>
        ) : null}
      </div>
    )
  }
}