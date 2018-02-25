// client/src/components/post/PostForm.js

import React, { Component } from 'react';

export default class PostForm extends Component {
  
  render() {
    return(
      <form onSubmit={(e) => this.props.handleSubmit(e, '/post/new')}>
        <label>Description</label>
        <input type='text' name='description'/><br/>
        <label>URL</label>
        <input type='text' name='url'/><br/>
        <button>Save</button>
      </form>
    )
  }
}
