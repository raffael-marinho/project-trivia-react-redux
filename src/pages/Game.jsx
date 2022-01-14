import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import md5 from 'crypto-js/md5';

class Game extends Component {
  render() {
    const { nome, email } = this.props;

    function gravatar() {
      return `https://www.gravatar.com/avatar/${md5(email).toString()} `;
    }

    return (
      <div>
        <header>
          <img src={ gravatar } alt="" data-testid="header-profile-picture" />
          <h2 data-testid="header-player-name">{nome}</h2>
          <div data-testid="header-score">placar</div>
        </header>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    nome: state.userReducer.nome,
    email: state.userReducer.email,
  };
}

Game.propTypes = {
  nome: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Game);
