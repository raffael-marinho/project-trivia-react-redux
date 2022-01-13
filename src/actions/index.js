export const GET_TOKEN = 'GET_TOKEN';

const actionGetToken = (payload) => ({
  type: GET_TOKEN,
  payload,
});

export default actionGetToken;
