import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

class MountAndRandomizeQuestions extends Component {
  constructor() {
    super();
    this.state = {
      questionOptions: [],
    };
  }

  handleBGColor = () => {
    const buttons = document.querySelectorAll('.optionButton');
    for (let i = 0; i < buttons.length; i += 1) {
      if (buttons[i].name === 'correctAnswer') {
        buttons[i].style.setProperty('border', '3px solid rgb(6, 240, 15)');
      } else {
        buttons[i].style.setProperty('border', '3px solid rgb(255, 0, 0)');
      }
    }
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
    const { randomizeOptions, handleBGColor } = this;
    const mountedArray = mergedOptions.map((option, index) => {
      if (index === 0) {
        return (
          <button
            data-testid="correct-answer"
            key={ index }
            type="button"
            onClick={ handleBGColor }
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
          onClick={ handleBGColor }
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
    questions.map((question, index) => index === 1 && mountOptions(question));
  }

  componentDidMount = () => {
    const { handleOptions } = this;
    handleOptions();
  }

  render() {
    const { questionOptions } = this.state;
    return (
      <div data-testid="answer-options">
        {
          questionOptions.map((option) => option)
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.userReducer.questions,
});

MountAndRandomizeQuestions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, null)(MountAndRandomizeQuestions);
