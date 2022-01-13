const INITIAL_STATE = {
  nome: '',
  email: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  const userObject = {
    ACTION_TYPE: '',
    DEFAULT: () => ({
      ...state,
    }),
  };
  return (userObject[action.type] || userObject.DEFAULT)();
};

export default userReducer;
