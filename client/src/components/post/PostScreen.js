// client/src/components/post/PostScreen.js

import React, { Component } from 'react';
import PostForm from './PostForm';
import { Button } from 'semantic-ui-react';

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
    return(
      <div>
        {newPost ? (
          <div>
            <PostForm user={this.props.user} handleSubmit={this.handleSubmit}/>
            <Button onClick={this.handleClick}>Cancel</Button>
          </div>
        ) :
          <Button onClick={this.handleClick}>New post</Button>}
        {currentPosts ? (
          <div>{currentPosts.map(post => (
            <div key={post.id}>{post.description}</div>
          ))}</div>
        ) : null }
      </div>
    )
  }
}