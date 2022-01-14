import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Game from '../pages/Game';
import Configuraçoes from '../pages/Configuraçoes';

class Content extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" render={ () => <Login /> } />
          <Route exact path="/game" render={ () => <Game /> } />
          <Route exact path="/configuraçao" render={ () => <Configuraçoes /> } />
        </Switch>
      </div>
    );
  }
}

export default Content;
