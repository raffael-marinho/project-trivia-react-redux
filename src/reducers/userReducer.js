const INITIAL_STATE = {
  nome: '',
  email: '',
  questions: [],
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
    }),
    DEFAULT: () => ({
      ...state,
    }),
  };
  return (userObject[action.type] || userObject.DEFAULT)();
};

export default userReducer;
