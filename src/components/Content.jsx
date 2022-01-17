import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Game from '../pages/Game';
import Configuraçoes from '../pages/Configuraçoes';
import Feedback from '../pages/Feedback';

class Content extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" render={ () => <Login /> } />
          <Route exact path="/game" render={ () => <Game /> } />
          <Route exact path="/configuraçao" render={ () => <Configuraçoes /> } />
          <Route exact path="/feedback" render={ () => <Feedback /> } />
        </Switch>
      </div>
    );
  }
}

export default Content;
