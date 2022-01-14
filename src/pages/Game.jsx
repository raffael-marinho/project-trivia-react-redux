import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import md5 from 'crypto-js/md5';

class Game extends Component {
  render() {
    const { nome, email } = this.props;
    return (
      <div>
        <header>
          <img src={`https://www.gravatar.com/avatar/${md5(email).toString()}`} alt="" data-testid="header-profile-picture" />
          <h2 data-testid="header-player-name">{nome}</h2>
          <div data-testid="header-score">0</div>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  nome: state.userReducer.nome,
  email: state.userReducer.email,
})

Game.propTypes = {
  nome: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Game);
