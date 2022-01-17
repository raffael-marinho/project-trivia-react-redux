const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
  questions: [],
  assertions: 0,
  score: 0,
  questionIndex: 0,
};

const handleQuestionIndex = (actualIndex, actualLength) => {
  let newIndex = actualIndex + 1;
  if (newIndex > actualLength - 1) newIndex = actualLength - 1;
  return newIndex;
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
    UPDATE_SCORE: () => ({
      ...state,
      score: action.score,
    }),
    INCREASE_QUESTION_INDEX: () => ({
      ...state,
      questionIndex: handleQuestionIndex(state.questionIndex, state.questions.length),
    }),
    DEFAULT: () => ({
      ...state,
    }),
  };
  return (userObject[action.type] || userObject.DEFAULT)();
};

export default player;
