
import React, { Component } from 'react';
import { Search, Grid, Header, Label, Button, Form } from 'semantic-ui-react';
import '../../App.css';

export default class SearchBar extends Component {
  componentWillMount() {
    this.resetComponent()
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) => {
    // this.setState({ value: result.title });
    // this.props.goToProfile(result.title);
    this.resetComponent();
  }

  handleSubmit = async (event, endpoint) => {
    event.preventDefault();
    const form = new FormData(event.target);
    await fetch(endpoint, {
      method: 'POST',
      credentials: 'include',
      body: form,
    })
  };

  handleSearchChange = (e, { value }) => {
    if (value.length >= this.props.minCharacters) {
      this.setState({ isLoading: true });
    };
    
    this.setState({ value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()
      if (this.state.value.length >= this.props.minCharacters) {
        /* Autosuggest.
        this.callApi(`/search/autosuggest?qs=${value}`)
        .then(res => this.setState({ isLoading: false, results: res.matches }));
        */
       /* Search. */
       this.callApi(`/search?qs=${value}`)
       .then(res => this.setState({ isLoading: false, results: res.matches}));
      }
    
    }, 500)
  }

  callApi = async (endpoint) => {
    const response = await fetch(endpoint, {
      credentials: 'include',
    });
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    const { isLoading, value, results } = this.state
    const resultRenderer = ({ title }) => [ 
      <div key='content' className='content'>
        {title && <div onClick={(e, title) => this.handleResultSelect} className='title'>{title}</div>}
        <Form onSubmit={(e) => this.handleSubmit(e, '/follow')}>
          <Form.Input type='text' name='follow' value={title} type='hidden'/>
          <Form.Button>Follow</Form.Button>
        </Form>
      </div>,
      ]
    return (
      <Search
        loading={isLoading}
        // onResultSelect={this.handleResultSelect}
        onSearchChange={this.handleSearchChange}
        results={results}
        value={value}
        {...this.props}
        className='top-search-bar'
        resultRenderer={resultRenderer}
      />
    )
  }
}
