import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

class QuestionText extends Component {
  render() {
    const { questions } = this.props;
    return (
      <div data-testid="question-category">
        {
          questions.map(
            (question) => question.question,
          ).find(
            (item, index) => index === 0 && (
              <h3>{item}</h3>
            ),
          )
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.userReducer.questions,
});

QuestionText.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, null)(QuestionText);
