import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { actionSaveNewToken, actionSaveQuestions } from '../actions';
import { fetchApiToGetToken, fetchApiToGetQuestions } from '../services/api';
import GameHeader from '../components/GameHeader';
import MountAndRandomizeQuestions from '../components/MountAndRandomizeQuestions';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      isLoaded: false,
    };
  }

  checkToken = async (data) => {
    const { props: { saveNewToken, saveQuestions, playerToken } } = this;
    const INVALID_TOKEN = 3;
    if (data.response_code === INVALID_TOKEN) {
      const result = await fetchApiToGetToken();
      saveNewToken(result);
      const newData = await fetchApiToGetQuestions(playerToken);
      saveQuestions(newData.results);
    }
    saveQuestions(data.results);
    this.setState({ isLoaded: true });
  }

  loadQuestions = async () => {
    const DEFAULT_QTY = 5;
    const { checkToken } = this;
    const { playerToken } = this.props;
    const data = await fetchApiToGetQuestions(DEFAULT_QTY, playerToken);
    checkToken(data);
  };

  componentDidMount = () => {
    const { loadQuestions } = this;
    loadQuestions();
  };

  render() {
    const { questions } = this.props;
    const { isLoaded } = this.state;
    return (
      <div>
        <GameHeader />
        <div>
          {
            questions.map(
              (question) => question.category,
            ).find(
              (item, index) => index === 1 && (
                <h3 data-testid="question-category">{item}</h3>
              ),
            )
          }
        </div>
        <div>
          {
            questions.map(
              (element) => element.question,
            ).find(
              (item, index) => index === 1 && (
                <p data-testid="question-text">{item}</p>
              ),
            )
          }
        </div>
        <div data-testid="answer-options">
          {
            isLoaded && <MountAndRandomizeQuestions />
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  playerToken: state.token,
  questions: state.userReducer.questions,
});

const mapDispatchToProps = (dispatch) => ({
  saveNewToken: (newToken) => dispatch(actionSaveNewToken(newToken)),
  saveQuestions: (questions) => dispatch(actionSaveQuestions(questions)),
});

Game.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  playerToken: PropTypes.string.isRequired,
  saveNewToken: PropTypes.func.isRequired,
  saveQuestions: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
