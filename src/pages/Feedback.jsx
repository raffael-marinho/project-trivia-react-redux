import React, { Component } from 'react';
import FeedbackHeader from './FeedbackHeader';
import FeedbackMessage from '../components/FeedbackMessage';
import Score from './Score';
import PlayAgain from '../components/PlayAgain';

class Feedback extends Component {
  render() {
    return (
      <div>
        <FeedbackHeader />
        <FeedbackMessage />
        <Score />
        <PlayAgain />
      </div>
    );
  }
}

export default Feedback;
