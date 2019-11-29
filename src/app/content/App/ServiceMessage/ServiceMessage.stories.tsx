import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Notification from 'components/organisms/Notification';
import ServiceMessage from './ServiceMessage';

storiesOf('screens/ServiceMessage', module)
  .addDecorator(getStory => (
    <Router>
      <Notification close={action('close')}>{getStory()}</Notification>
    </Router>
  ))
  .add('With an action', () => (
    <ServiceMessage
      serviceMessage="I'm a service message!"
      action={{ label: "I'm an action", url: '/onboarding' }}
      openOnboarding={() => action('openOnboarding')}
    />
  ))
  .add('Without an action', () => (
    <ServiceMessage
      serviceMessage="I'm a service message!"
      openOnboarding={() => action('openOnboarding')}
    />
  ));