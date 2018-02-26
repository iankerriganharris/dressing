import React, { Component } from 'react';
import LoginScreen from './components/auth/LoginScreen';
import DashboardScreen from './components/dashboard/DashboardScreen';
import { Button, Header } from 'semantic-ui-react';
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
        {loggedIn ? (
          <DashboardScreen user={loggedIn.user} refreshUser={this.refreshUser} logout={this.logout}/>
        ) :
          <div> 
            <header className="App-header">
              <h1 className="App-title">Welcome to React</h1>
            </header>
            <LoginScreen />
          </div>
        }
      </div>
    );
  }
}

export default App;
