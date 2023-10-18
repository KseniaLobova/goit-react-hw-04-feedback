import { useState } from 'react';
import { FeedbackOptions } from '../FeedbackOptions/FeedbackOptions';
import { Section } from '../Section/Section';
import { Statistic } from '../Statistics/Statistics';
import { Notification } from '../Notification/Notification';
import { SectionWrap } from './App.styled';

export const App = () => {
  const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 });

  const onLeaveFeedback = option => {
    setFeedback(prevState => ({
      ...prevState,
      [option]: prevState[option] + 1,
    }));
  };

  const totalFeedback = feedback.good + feedback.bad + feedback.neutral;

  // const countPositiveFeedbackPercentage = () => {
  //   return Math.round((feedback.good / totalFeedback) * 100);
  // };
  const options = Object.keys(feedback);
  const positivePercentage = Math.round((feedback.good / totalFeedback) * 100);

  return (
    <SectionWrap>
      <Section title="Please leave feedback">
        <FeedbackOptions onLeaveFeedback={onLeaveFeedback} options={options} />
      </Section>
      <Section title="Statistics">
        {totalFeedback !== 0 ? (
          <Statistic
            good={feedback.good}
            neutral={feedback.neutral}
            bad={feedback.bad}
            total={totalFeedback}
            positivePercentage={positivePercentage}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </SectionWrap>
  );
};
