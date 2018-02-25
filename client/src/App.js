import React, { Component } from 'react';
import LoginScreen from './components/auth/LoginScreen';
import DashboardScreen from './components/dashboard/DashboardScreen';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    response: '',
    loggedIn: false,
  };

  componentWillMount() {
    this.refreshUser();
  };

  refreshUser = () => {
    this.callApi('/profile')
    .then(res => this.setState({loggedIn: res.response}));
  };

  logout = () => {
    this.callApi('/logout')
    .then(this.setState({loggedIn: false}));
  };

  callApi = async (endpoint) => {
    const response = await fetch(endpoint, {
      credentials: 'include',
    });
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    const loggedIn = this.state.loggedIn;
    const logout = this.logout;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React{loggedIn ? (', ' + loggedIn.user.username) : null}</h1>
          {loggedIn ? <button onClick={(logout)}>Logout</button> : null}
        </header>
        <p className="App-intro"></p>
        {loggedIn ? (
          <DashboardScreen user={loggedIn.user} refreshUser={this.refreshUser}/>
        ) : <LoginScreen /> }
      </div>
    );
  }
}

export default App;
