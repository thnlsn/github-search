import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Search extends Component {
  state = {
    search: ''
  };

  static propTypes = {
    searchUsers: PropTypes.func.isRequired
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.searchUsers(this.state.search); //passing in a prop from app
    this.setState({ search: '' });
  };

  onChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit} className='form'>
          <input
            type='text'
            name='search'
            placeholder='Search Users...'
            value={this.state.search}
            onChange={this.onChange}
          />
          <input
            type='submit'
            value='Search'
            className='btn btn-dark btn-block'
          />
        </form>
      </div>
    );
  }
}

export default Search;
