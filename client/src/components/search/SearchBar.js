
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
    if(result.document.username) {
      this.props.goToProfile(result.document.username)
    }
    this.resetComponent();
  }

  handleSearchChange = (e, { value }) => {
    if (value.length >= this.props.minCharacters) {
      this.setState({ isLoading: true });
    };

    console.log(value);
    
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
    const resultRenderer = ({ document }) => {
      if (document.username) {
        return <Label key='content' content={document.username}/>
      } else if (document.description) {
        return <Label key='content' content={document.description}/>
      }
    }
    return (
      <Search
        loading={isLoading}
        onResultSelect={this.handleResultSelect}
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
