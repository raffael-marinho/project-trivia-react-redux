import React, { Component } from 'react';

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

  render() {
    const { handleChange } = this;
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
        >
          Play
        </button>
      </div>
    );
  }
}

export default Login;
