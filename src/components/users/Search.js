import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Search extends Component {
   state = {
      search: ''
   };

   static propTypes = {
      searchUsers: PropTypes.func.isRequired,
      clearUsers: PropTypes.func.isRequired,
      showClear: PropTypes.bool.isRequired,
      setAlert: PropTypes.func.isRequired,
      removeAlert: PropTypes.func.isRequired
   };

   onSubmit = event => {
      event.preventDefault();
      if (this.state.search === '') {
         this.props.setAlert('Please enter something', 'light');
      } else {
         this.props.searchUsers(this.state.search); // Passing in a prop from app
         this.setState({ search: '' });
         this.props.removeAlert();
      }
   };

   onChange = event =>
      this.setState({ [event.target.name]: event.target.value });

   render() {
      const { showClear, clearUsers } = this.props;

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
            {showClear && (
               <button className='btn btn-lite btn-block' onClick={clearUsers}>
                  Clear
               </button>
            )}
         </div>
      );
   }
}

export default Search;
