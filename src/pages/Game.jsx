import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { actionSaveNewToken, actionSaveQuestions } from '../actions';
import { fetchApiToGetToken, fetchApiToGetQuestions } from '../services/api';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      questionOptions: [],
    };
  }

  // Reference: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  randomizeOptions = (mountedArray) => {
    for (let i = mountedArray.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [mountedArray[i], mountedArray[j]] = [mountedArray[j], mountedArray[i]];
    }
    this.setState({ questionOptions: [...mountedArray] });
  }

  mountOptionsHtmlElements = (mergedOptions) => {
    const { randomizeOptions } = this;
    const mountedArray = mergedOptions.map((option, index) => {
      if (index === 0) {
        return (
          <button
            data-testid="correct-answer"
            key={ index }
            type="button"
          >
            {option}
          </button>
        );
      }
      return (
        <button
          data-testid={ `wrong-answer-${index - 1}` }
          key={ index }
          type="button"
        >
          {option}
        </button>
      );
    });
    randomizeOptions(mountedArray);
  };

  mountOptions = (object) => {
    const { mountOptionsHtmlElements } = this;
    const options = [object.correct_answer, object.incorrect_answers];
    const mergedOptions = [].concat([], ...options);
    mountOptionsHtmlElements(mergedOptions);
  };

  handleOptions = () => {
    const { mountOptions } = this;
    const { questions } = this.props;
    questions.map((question, index) => index === 1 && mountOptions(question));
  }

  loadQuestions = async () => {
    const { playerToken, saveNewToken, saveQuestions } = this.props;
    const { handleOptions } = this;
    const data = await fetchApiToGetQuestions(playerToken);
    if (data.results === []) {
      const result = await fetchApiToGetToken();
      saveNewToken(result);
      const newData = await fetchApiToGetQuestions(playerToken);
      saveQuestions(newData.results);
    }
    saveQuestions(data.results);
    handleOptions();
  };

  componentDidMount = () => {
    const { loadQuestions } = this;
    loadQuestions();
  };

  render() {
    const { questionOptions } = this.state;
    const { questions } = this.props;
    return (
      <div>
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
            questionOptions.map((option, index) => <div key={ index }>{ option }</div>)
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
