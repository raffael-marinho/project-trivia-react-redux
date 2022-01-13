const TOKEN_URL = 'https://opentdb.com/api_token.php?command=request';

export const fetchApiToGetToken = async () => {
  const response = await fetch(TOKEN_URL);
  const JSON = await response.json();
  return JSON;
};

const QUESTIONS_URL = 'https://opentdb.com/api.php?amount=5&token=';

export const fetchApiToGetQuestions = async (token) => {
  const response = await fetch(`${QUESTIONS_URL}${token}`);
  const JSON = await response.json();
  return JSON;
};
