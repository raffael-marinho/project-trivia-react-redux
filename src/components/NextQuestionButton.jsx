import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { actionIncreaseQuestionIndex } from '../actions';

class NextQuestionButton extends Component {
  render() {
    const { increaseQuestionIndex } = this.props;
    return (
      <div>
        <button
          data-testid="btn-next"
          type="button"
          onClick={ increaseQuestionIndex }
        >
          Next
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  increaseQuestionIndex: () => dispatch(actionIncreaseQuestionIndex()),
});

NextQuestionButton.propTypes = {
  increaseQuestionIndex: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(NextQuestionButton);
