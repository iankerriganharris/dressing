
import React, { Component } from 'react';
import { Search, Grid, Header } from 'semantic-ui-react';

export default class SearchBar extends Component {
  componentWillMount() {
    this.resetComponent()
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) => this.setState({ value: result.username })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      this.callApi(`/search?qs=${value}`)
      .then(res => this.setState({ isLoading: false, results: res.matches }));
    
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
    console.log(this.state.results);

    return (
      <Grid>
        <Grid.Column width={8}>
          <Search
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={this.handleSearchChange}
            results={results}
            value={value}
            {...this.props}
          />
        </Grid.Column>
      </Grid>
    )
  }
}
