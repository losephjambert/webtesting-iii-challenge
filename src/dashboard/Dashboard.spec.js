import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Dashboard from './Dashboard';

test('it renders correctly', () => {
  // do snapshots here if you're not in codesandbox
  render(<Dashboard />);
});

test('gate defaults to unlocked and open', () => {
  const { getByText } = render(<Dashboard />);
  expect(getByText(/open/i));
  expect(getByText(/unlocked/i));
});

test('Dashboard shows the controls and display', () => {
  expect(render(<Dashboard />)).toMatchSnapshot();
});
