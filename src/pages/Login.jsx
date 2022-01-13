import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { PropTypes } from 'prop-types';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      email: '',
      isDisabled: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    const { handleBtn } = this;
    this.setState({ [name]: value }, () => handleBtn());
  };

  handleBtn = () => {
    const { nome, email } = this.state;
    if (nome === '' || email === '') {
      this.setState({ isDisabled: true });
    } else {
      this.setState({ isDisabled: false });
    }
  };

  handleBtnClick = () => {
    const { history } = this.props;
    history.push('/game');
    
  };

  render() {
    const { handleChange, handleBtnClick } = this;
    const { nome, email, isDisabled } = this.state;
    return (
      <div>
        <label
          htmlFor="input-player-name"
        >
          Nome:
          <input
            data-testid="input-player-name"
            id="input-player-name"
            type="text"
            name="nome"
            onChange={ handleChange }
            value={ nome }
          />
        </label>
        <label
          htmlFor="input-gravatar-email"
        >
          E-mail:
          <input
            data-testid="input-gravatar-email"
            id="input-gravatar-email"
            type="email"
            name="email"
            onChange={ handleChange }
            value={ email }
          />
        </label>
        <button
          data-testid="btn-play"
          type="button"
          disabled={ isDisabled }
          onClick={ handleBtnClick }
        >
          Play
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(Login);
