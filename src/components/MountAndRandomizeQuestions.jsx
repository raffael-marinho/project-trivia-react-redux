import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { actionUpdateScore } from '../actions';
import NextQuestionButton from './NextQuestionButton';

class MountAndRandomizeQuestions extends Component {
  constructor() {
    super();
    this.state = {
      questionOptions: [],
      answered: false,
    };
  }

  calculateScore = (target) => {
    const SCORE_CONSTANT = 10;
    const difficultyObject = {
      easy: 1,
      medium: 2,
      hard: 3,
    };
    const { questions, name, updateScore, questionIndex } = this.props;
    const remainingTime = document.querySelector('.timer').innerText;
    const profilePicture = document.querySelector('#header-profile-picture').src;
    const previousScore = JSON.parse(localStorage.getItem('ranking')).score;

    if (target.name === 'correctAnswer') {
      const currentScore = SCORE_CONSTANT
        + (Number(remainingTime)
        * Number(difficultyObject[questions[questionIndex].difficulty]));
      const finalScore = previousScore + currentScore;
      const mountedScore = {
        name,
        score: finalScore,
        picture: profilePicture,
      };
      localStorage.setItem('ranking', JSON.stringify(mountedScore));
      updateScore(finalScore);
      this.setState({ answered: true });
    } else {
      const mountedScore = {
        name,
        score: previousScore,
        picture: profilePicture,
      };
      localStorage.setItem('ranking', JSON.stringify(mountedScore));
      updateScore(previousScore);
      this.setState({ answered: true });
    }
  };

  handleOptionButton = ({ target }) => {
    const { calculateScore } = this;
    const buttons = document.querySelectorAll('.optionButton');
    for (let i = 0; i < buttons.length; i += 1) {
      if (buttons[i].name === 'correctAnswer') {
        buttons[i].style.setProperty('border', '3px solid rgb(6, 240, 15)');
      } else {
        buttons[i].style.setProperty('border', '3px solid rgb(255, 0, 0)');
      }
    }
    calculateScore(target);
  }

  randomizeOptions = (mountedArray) => {
    for (let i = mountedArray.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [mountedArray[i], mountedArray[j]] = [mountedArray[j], mountedArray[i]];
    }
    this.setState(
      (prevState) => ({ questionOptions: [...prevState.questionOptions, mountedArray] }),
    );
  };

  mountOptionsHtmlElements = (mergedOptions) => {
    const { randomizeOptions, handleOptionButton } = this;
    const mountedArray = mergedOptions.map((option, index) => {
      if (index === 0) {
        return (
          <button
            data-testid="correct-answer"
            key={ index }
            type="button"
            onClick={ handleOptionButton }
            name="correctAnswer"
            className="optionButton"
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
          onClick={ handleOptionButton }
          name="wrongAnswer"
          className="optionButton"
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
    const { questions } = this.props;
    const { mountOptions } = this;
    questions.map((question) => mountOptions(question));
  };

  setInitialScore = () => {
    const { handleOptions } = this;
    localStorage.setItem('ranking', JSON.stringify({
      name: '',
      score: 0,
      picture: '',
    }));
    handleOptions();
  };

  componentDidMount = () => {
    const { setInitialScore } = this;
    setInitialScore();
  }

  render() {
    const { questionIndex } = this.props;
    const { questionOptions, answered } = this.state;
    return (
      <div data-testid="answer-options">
        {
          questionOptions.map((option, index) => index === questionIndex && option)
        }
        {
          answered && <NextQuestionButton />
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.player.questions,
  questionIndex: state.player.questionIndex,
  name: state.player.name,
});

const mapDispatchToProps = (dispatch) => ({
  updateScore: (score) => dispatch(actionUpdateScore(score)),
});

MountAndRandomizeQuestions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  name: PropTypes.string.isRequired,
  updateScore: PropTypes.func.isRequired,
  questionIndex: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MountAndRandomizeQuestions);
