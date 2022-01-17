import React, { Component } from 'react';
import FeedbackHeader from './FeedbackHeader';
import FeedbackMessage from '../components/FeedbackMessage';
import Score from './Score';

class Feedback extends Component {
  render() {
    return (
      <div>
        <FeedbackHeader />
        <FeedbackMessage />
        <Score />
      </div>
    );
  }
}

export default Feedback;
