import { fetchApiToGetToken } from '../services/api';

const UPDATE_PLAYER_INFOS = 'UPDATE_PLAYER_INFOS';

const actionUpdatePlayerInfos = ({ response_code: responseCode }, { nome, email }) => ({
  type: UPDATE_PLAYER_INFOS,
  responseCode,
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
      dispatch(actionUpdatePlayerInfos(response, playerNameAndEmail));
      dispatch(actionGetToken(response));
    })
    .catch((error) => console.log(error))
);
