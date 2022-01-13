import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Game from '../pages/Game';

class Content extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" render={ () => <Login /> } />
          <Route exact path="/game" render={ () => <Game /> } />
        </Switch>
      </div>
    );
  }
}

export default Content;
