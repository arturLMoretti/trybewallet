import React from 'react';
import { Switch, Route } from 'react-router';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    return (
      <Switch>
        <Route path="/" exact render={ (props) => (<Login { ...props } />) } />
        <Route path="/carteira" render={ (props) => (<Wallet { ...props } />) } />
      </Switch>
    );
  }
}

export default App;
