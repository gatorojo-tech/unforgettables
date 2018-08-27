import React from 'react';
import ReactDOM from 'react-dom';
import SettingsPageContainer from '../index.jsx';

describe('SettingsPageContainer', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SettingsPageContainer />, div);
  });
});
