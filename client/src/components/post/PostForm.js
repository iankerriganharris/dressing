// client/src/components/post/PostForm.js

import React, { Component } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';

export default class PostForm extends Component {
  
  render() {
    if(this.props.postSuccess) {
      return(
        <Form success onSubmit={(e) => this.props.handleSubmit(e, '/post/new')}>
          <Form.Group>
            <Form.Input placeholder='description' type='text' name='description'/>
            <Form.Button content='Post'/>
          </Form.Group>
          <Message
            success
            compact
            attached='bottom'
            header='Post Saved Successfully'
            content="Check your timeline for responses"
          />
        </Form>
      )
    } else {
      return(
        <Form onSubmit={(e) => this.props.handleSubmit(e, '/post/new')}>
          <Form.Group>
            <Form.Input placeholder='description' type='text' name='description'/>
            <Form.Button content='Post'/>
          </Form.Group>
        </Form>
      )
    }
  }
}
