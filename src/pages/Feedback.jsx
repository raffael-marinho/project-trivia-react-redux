import React, { Component } from 'react';
import FeedbackHeader from './FeedbackHeader';
import FeedbackMessage from '../components/FeedbackMessage';

class Feedback extends Component {
  render() {
    return (
      <div>
        <FeedbackHeader />
        <FeedbackMessage />
      </div>
    );
  }
}

export default Feedback;
