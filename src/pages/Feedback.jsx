import React, { Component } from 'react';
import FeedbackHeader from './FeedbackHeader';
import FeedbackMessage from '../components/FeedbackMessage';
import Score from './Score';
import PlayAgain from '../components/PlayAgain';
import ButtonRanking from '../components/ButtonRanking';

class Feedback extends Component {
  render() {
    return (
      <div>
        <FeedbackHeader />
        <FeedbackMessage />
        <Score />
        <PlayAgain />
        <ButtonRanking />
      </div>
    );
  }
}

export default Feedback;
