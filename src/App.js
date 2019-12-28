import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';

import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';

import './App.css';

const App = () => {
    const [alert, setAlert] = useState(null);

    //▓▓ Set Alert
    const showAlert = (msg, type) => {
        setAlert({ msg, type }); // Normally would have (key: value) (msg: msg, type: type), but because it is same, just (msg, type)
        setTimeout(() => setAlert(null), 5000);
    };

    //▓▓ Remove Alert
    const removeAlert = () => setAlert(null);

    return (
        <GithubState>
            <AlertState>
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
                                                showAlert={showAlert}
                                                removeAlert={removeAlert}
                                            />
                                            <Users />
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
                                    component={User}
                                />
                            </Switch>
                        </div>
                    </div>
                </Router>
            </GithubState>
        </AlertState>
    );
};

export default App;
