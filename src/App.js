import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import axios from 'axios';

import GithubState from './context/github/GithubState';

import './App.css';

const App = () => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);

    /*   async componentDidMount() {
    this.setState({ loading: true });
    const res = await Axios.get(
      `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ users: res.data, loading: false });
  } */

    // ▓▓ Get a single GitHub user (? marks FIRST parameter of the search query)
    const getUser = async username => {
        setLoading(true);

        const res = await axios.get(
            `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );
        console.log(res.data);

        setUser(res.data);
        setLoading(false);
    };

    // ▓▓ Get a single GitHub users repositories
    const getUserRepos = async username => {
        setLoading(true);

        const res = await axios.get(
            `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );
        console.log(res.data);

        setRepos(res.data);
        setLoading(false);
    };

    //▓▓ Clear users from state (passed into search component as a prop)
    const clearUsers = () => {
        setUsers([]);
        setLoading(false);
    };

    //▓▓ Set Alert
    const showAlert = (msg, type) => {
        setAlert({ msg, type }); // Normally would have (key: value) (msg: msg, type: type), but because it is same, just (msg, type)
        setTimeout(() => setAlert(null), 5000);
    };

    //▓▓ Remove Alert
    const removeAlert = () => setAlert(null);

    return (
        <GithubState>
            <Router>
                <div className='App'>
                    <Navbar />
                    <div className='container'>
                        <Alert alert={alert} />
                        <Switch>
                            <Route
                                exact
                                path='/' // This exact path will render the search component
                                render={props => (
                                    <Fragment>
                                        <Search
                                            clearUsers={clearUsers}
                                            showClear={
                                                users.length > 0 ? true : false
                                            }
                                            showAlert={showAlert}
                                            removeAlert={removeAlert}
                                        />
                                        <Users
                                            loading={loading}
                                            users={users}
                                        />
                                    </Fragment>
                                )}
                            />
                            <Route
                                exact
                                path='/about' /* No render function because no props needed */
                                component={About}
                            />
                            <Route
                                exact
                                path='/user/:login'
                                render={props => (
                                    // user will be filled with the response from getUser(), which will be found in state once called
                                    <User
                                        {...props}
                                        getUser={getUser}
                                        getUserRepos={getUserRepos}
                                        user={user}
                                        repos={repos}
                                        loading={loading}
                                    />
                                )}
                            />
                        </Switch>
                    </div>
                </div>
            </Router>
        </GithubState>
    );
};

export default App;
