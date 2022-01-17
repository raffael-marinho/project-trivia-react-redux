import React, { Component } from 'react';
import FeedbackHeader from './FeedbackHeader';
import FeedbackMessage from '../components/FeedbackMessage';
import PlayAgain from '../components/PlayAgain';

class Feedback extends Component {
  render() {
    return (
      <div>
        <FeedbackHeader />
        <FeedbackMessage />
        <PlayAgain />
      </div>
    );
  }
}

export default Feedback;
