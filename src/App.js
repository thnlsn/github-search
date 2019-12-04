import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import './App.css';
import Axios from 'axios';

class App extends Component {
  state = {
    users: [],
    loading: false, // false so that we can add a loading spinner for when it is true
    alert: null
  };

  /*   async componentDidMount() {
    this.setState({ loading: true });
    const res = await Axios.get(
      `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ users: res.data, loading: false });
  } */

  //▓▓ Search GitHub users (passed into the Search component as a prop)
  searchUsers = async search => {
    this.setState({ loading: true });

    const res = await Axios.get(
      `https://api.github.com/search/users?q=${search}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    console.log(res.data.items);

    this.setState({ users: res.data.items, loading: false });
  };

  //▓▓ Clear users from state (passed into search component as a prop)
  clearUsers = () => this.setState({ users: [], loading: false });

  //▓▓ Set Alert
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } }); // Normally would have (key: value) (msg: msg, type: type), but because it is same, just (msg, type)
    setTimeout(() => this.setState({ alert: null }), 5000);
  };

  removeAlert = () => this.setState({ alert: null });

  render() {
    const { loading, users, alert } = this.state;

    return (
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Search
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            showClear={users.length > 0 ? true : false}
            setAlert={this.setAlert}
            removeAlert={this.removeAlert}
          />
          <Alert alert={alert} />
          <Users loading={loading} users={users} />
        </div>
      </div>
    );
  }
}

export default App;
