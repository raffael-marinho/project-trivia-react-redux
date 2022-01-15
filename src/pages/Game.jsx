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
    }
    loadQuestions();
  }

  loadQuestions = async () => {
    const DEFAULT_QTY = 5;
    const { getQuestions, playerToken } = this.props;
    await getQuestions(DEFAULT_QTY, playerToken);
  };

  componentDidMount = () => {
    const { checkToken } = this;
    checkToken();
  };

  render() {
    const { questions } = this.props;
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
