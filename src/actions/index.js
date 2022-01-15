import { fetchApiToGetQuestions, fetchApiToGetToken } from '../services/api';

const UPDATE_PLAYER_INFOS = 'UPDATE_PLAYER_INFOS';
export const GET_TOKEN = 'GET_TOKEN';

export const actionUpdatePlayerInfos = ({ nome, email }) => ({
  type: UPDATE_PLAYER_INFOS,
  nome,
  email,
});

const actionGetToken = ({ token }) => ({
  type: GET_TOKEN,
  token,
});

export const actionFetchApiToGetPlayerToken = (playerNameAndEmail) => (dispatch) => (
  fetchApiToGetToken()
    .then((response) => {
      dispatch(actionUpdatePlayerInfos(playerNameAndEmail));
      dispatch(actionGetToken(response));
    })
    .catch((error) => console.log(error))
);

export const actionFetchApiToGetAnotherToken = () => (dispatch) => (
  fetchApiToGetToken()
    .then((response) => {
      dispatch(actionGetToken(response));
    })
    .catch((error) => console.log(error))
);

const SAVE_QUESTIONS = 'SAVE_QUESTIONS';
export const actionSaveQuestions = (data) => ({
  type: SAVE_QUESTIONS,
  questions: data.results,
  responseCode: data.response_code,
});

export const actionFetchApiToGetQuizQuestions = (quantity, playerToken) => (dispatch) => {
  fetchApiToGetQuestions(quantity, playerToken)
    .then((response) => {
      dispatch(actionSaveQuestions(response));
    })
    .catch((error) => console.log(error));
};

export default actionGetToken;
