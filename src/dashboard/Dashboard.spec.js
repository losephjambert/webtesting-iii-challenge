import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Dashboard from './Dashboard';

test('it renders correctly', () => {
  // do snapshots here if you're not in codesandbox
  render(<Dashboard />);
});
