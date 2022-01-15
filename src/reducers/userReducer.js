const INITIAL_STATE = {
  nome: '',
  email: '',
  questions: [],
  responseCode: 0,
};

const userReducer = (state = INITIAL_STATE, action) => {
  const userObject = {
    UPDATE_PLAYER_INFOS: () => ({
      ...state,
      nome: action.nome,
      email: action.email,
    }),
    SAVE_QUESTIONS: () => ({
      ...state,
      questions: [...action.questions],
      responseCode: action.responseCode,
    }),
    DEFAULT: () => ({
      ...state,
    }),
  };
  return (userObject[action.type] || userObject.DEFAULT)();
};

export default userReducer;
