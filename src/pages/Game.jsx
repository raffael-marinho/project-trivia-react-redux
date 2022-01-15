import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import {
  actionFetchApiToGetAnotherToken,
  actionFetchApiToGetQuizQuestions,
  actionSaveQuestions,
} from '../actions';
import GameHeader from '../components/GameHeader';
import MountAndRandomizeQuestions from '../components/MountAndRandomizeQuestions';

class Game extends Component {
  checkToken = async () => {
    const { loadQuestions, props: { responseCode, getAnotherToken } } = this;
    const INVALID_TOKEN = 3;
    if (responseCode === INVALID_TOKEN) {
      await getAnotherToken();
      loadQuestions();
    } else {
      return 0;
    }
  }

  loadQuestions = async () => {
    const DEFAULT_QTY = 5;
    const { checkToken } = this;
    const { getQuestions, playerToken } = this.props;
    await getQuestions(DEFAULT_QTY, playerToken);
    checkToken();
  };

  componentDidMount = () => {
    const { loadQuestions } = this;
    loadQuestions();
  };

  render() {
    const { questions } = this.props;
    return (
      <div>
        <GameHeader />
        <div data-testid="question-category">
          {
            questions.map(
              (question) => question.category,
            ).find(
              (item, index) => index === 0 && (
                <h3>{item}</h3>
              ),
            )
          }
        </div>
        <div data-testid="question-text">
          {
            questions.map(
              (element) => element.question,
            ).find(
              (item, index) => index === 0 && (
                <p>{item}</p>
              ),
            )
          }
        </div>
        <div data-testid="answer-options">
          {
            questions.length > 0 && <MountAndRandomizeQuestions />
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  playerToken: state.token,
  questions: state.userReducer.questions,
  responseCode: state.userReducer.responseCode,
});

const mapDispatchToProps = (dispatch) => ({
  saveQuestions: (questions) => dispatch(actionSaveQuestions(questions)),
  getQuestions:
    (quantity, playerToken) => dispatch(
      actionFetchApiToGetQuizQuestions(quantity, playerToken),
    ),
  getAnotherToken: () => dispatch(actionFetchApiToGetAnotherToken()),
});

Game.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  playerToken: PropTypes.string.isRequired,
  responseCode: PropTypes.number.isRequired,
  getAnotherToken: PropTypes.func.isRequired,
  getQuestions: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
