import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import GithubContext from '../../context/github/githubContext';

const Search = ({ showAlert, removeAlert }) => {
    const githubContext = useContext(GithubContext); // you can call anything (actions) from this variable
    const [text, setText] = useState('');

    const onSubmit = event => {
        event.preventDefault();
        if (text === '') {
            showAlert('Please enter something', 'light');
        } else {
            githubContext.searchUsers(text); // passing in a prop from app
            setText('');
            removeAlert();
        }
    };

    const onChange = event => setText(event.target.value);

    return (
        <div>
            <form onSubmit={onSubmit} className='form'>
                <input
                    type='text'
                    name='search'
                    placeholder='Search Users...'
                    value={text}
                    onChange={onChange}
                />
                <input
                    type='submit'
                    value='Search'
                    className='btn btn-dark btn-block'
                />
            </form>
            {githubContext.users.length > 0 && (
                <button
                    className='btn btn-lite btn-block'
                    onClick={githubContext.clearUsers}
                >
                    Clear
                </button>
            )}
        </div>
    );
};

Search.propTypes = {
    removeAlert: PropTypes.func.isRequired
};

export default Search;
