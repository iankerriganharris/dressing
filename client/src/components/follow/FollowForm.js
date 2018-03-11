// client/src/components/follow/FollowForm.js

import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

export default class FollowForm extends Component {

  handleSubmit = async (event, endpoint) => {
    event.preventDefault();
    const form = new FormData(event.target);
    await fetch(endpoint, {
      method: 'POST',
      credentials: 'include',
      body: form,
    })
  };

  render() {
    return(
      <Form onSubmit={(e) => this.handleSubmit(e, '/follow')}>
        <Form.Input label='Enter person to follow. ' type='text' name='follow' />
        <Form.Button>Submit</Form.Button>
      </Form>
    )
  }
}