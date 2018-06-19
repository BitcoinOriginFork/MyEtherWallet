import React from 'react';
import './index.scss';

interface Props {
  error: Error;
}

const ErrorScreen: React.SFC<Props> = ({ error }) => {
  return (
    <div className="ErrorScreen">
      <div className="ErrorScreen-content">
        <h2>Oops!</h2>
        <p>Something went really wrong!</p>
        <code>{error.message}</code>
      </div>
    </div>
  );
};

export default ErrorScreen;
