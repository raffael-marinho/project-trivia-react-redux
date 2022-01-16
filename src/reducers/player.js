const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
  questions: [],
  assertions: 0,
  score: 0,
};

const player = (state = INITIAL_STATE, action) => {
  const userObject = {
    UPDATE_PLAYER_INFOS: () => ({
      ...state,
      name: action.nome,
      gravatarEmail: action.email,
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

export default player;
