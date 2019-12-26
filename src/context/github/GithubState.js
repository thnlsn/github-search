// Initial state and all of our actions will go here, such as fetching data etc.

import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS
} from '../types';

const GithubState = props => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    };

    const [state, dispatch] = useReducer(GithubReducer, initialState);

    // Search User

    // Get User

    // Get Repos

    // Clear Users

    // Set Loading

    return (
        <GithubContext.Provider
            value={{
                users: state.users,
                user: state.user,
                repos: state.repos,
                loading: state.loading
            }}
        >
            {props.children}
        </GithubContext.Provider>
    );
};

export default GithubState;
