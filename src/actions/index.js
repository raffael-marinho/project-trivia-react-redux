import { fetchApiToGetToken } from '../services/api';

const UPDATE_PLAYER_INFOS = 'UPDATE_PLAYER_INFOS';

const actionUpdatePlayerInfos = ({ nome, email }) => ({
  type: UPDATE_PLAYER_INFOS,
  nome,
  email,
});

export const GET_TOKEN = 'GET_TOKEN';

const actionGetToken = ({ token }) => ({
  type: GET_TOKEN,
  token,
});

export default actionGetToken;

export const actionFetchApiToGetPlayerToken = (playerNameAndEmail) => (dispatch) => (
  fetchApiToGetToken()
    .then((response) => {
      dispatch(actionUpdatePlayerInfos(playerNameAndEmail));
      dispatch(actionGetToken(response));
    })
    .catch((error) => console.log(error))
);

const SAVE_NEW_TOKEN = 'SAVE_NEW_TOKEN';

export const actionSaveNewToken = (newToken) => ({
  type: SAVE_NEW_TOKEN,
  newToken,
});

const SAVE_QUESTIONS = 'SAVE_QUESTIONS';
export const actionSaveQuestions = (questions) => ({
  type: SAVE_QUESTIONS,
  questions,
});
