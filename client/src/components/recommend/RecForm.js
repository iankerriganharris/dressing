// client/src/components/recommend/RecForm.js

import React, { Component } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';

export default class PostForm extends Component {
  render() {
    return (
      <Form onSubmit={(e) => this.props.handleSubmit(e, '/recommend/new')}>
        <Form.Group>
          <Form.Input placeholder='description' type='text' name='description'/>
          <Form.Input placeholder='url' type='text' name='url'/>
          <Form.Input type='hidden' value={this.props.post_id} name='post_id'/>
          <Form.Button content='Recommend'/>
        </Form.Group>
      </Form>
    )
  }
}
