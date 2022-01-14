import React, { Component } from 'react';

class Game extends Component {
  render() {
    return (
      <div>
        <header>
          <img src="" alt="" data-testid="header-profile-picture" />
          <h2 data-testid="header-player-name">nome da pessoa</h2>
          <div data-testid="header-score">placar</div>
        </header>
      </div>
    );
  }
}

export default Game;
