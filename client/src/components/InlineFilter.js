// client/src/components/common/InlineFilter.js

import React, { Component } from 'react'
import { Dropdown } from 'semantic-ui-react'

export default class InlineFilter extends Component {
  handleChange = (event, data) => {
    this.props.applyFilter(data.value)
  }
  render() {
    return(
      <span>
      Show me posts by
      {' '}
      <Dropdown inline 
        options={this.props.filterObject} 
        defaultValue={this.props.filterObject[0].value}
        onChange={this.handleChange}
      />
    </span>
    )
  }
}