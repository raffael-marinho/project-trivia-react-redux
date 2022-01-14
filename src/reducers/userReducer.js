const INITIAL_STATE = {
  nome: '',
  email: '',
  responseCode: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  const userObject = {
    UPDATE_PLAYER_INFOS: () => ({
      ...state,
      responseCode: action.responseCode,
      nome: action.nome,
      email: action.email,
    }),
    DEFAULT: () => ({
      ...state,
    }),
  };
  return (userObject[action.type] || userObject.DEFAULT)();
};

export default userReducer;
