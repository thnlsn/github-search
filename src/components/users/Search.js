import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Search = ({
    searchUsers,
    showClear,
    clearUsers,
    setAlert,
    removeAlert
}) => {
    const [text, setText] = useState('');

    const onSubmit = event => {
        event.preventDefault();
        if (text === '') {
            setAlert('Please enter something', 'light');
        } else {
            searchUsers(text); // Passing in a prop from app
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
            {showClear && (
                <button className='btn btn-lite btn-block' onClick={clearUsers}>
                    Clear
                </button>
            )}
        </div>
    );
};

Search.propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired,
    removeAlert: PropTypes.func.isRequired
};

export default Search;
