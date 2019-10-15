import React from 'react';
import { render, queryByText } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Display from './Display';

test('Display renders correctly', () => {
  render(<Display />);
});

test(`displays 'Locked' if the locked prop is true and 'Unlocked' if otherwise`, () => {
  const { getByText, queryByText } = render(<Display locked={false} />);
  expect(getByText(/unlocked/i));
  expect(queryByText(/^locked/i)).toBeFalsy();
});

test(`displays 'Closed' if the closed prop is true and 'Open' if otherwise`, () => {
  const { getByText, queryByText } = render(<Display closed={true} />);
  expect(getByText(/closed/i));
  expect(queryByText(/^open/i)).toBeFalsy();
});

test('when unlocked or open, use the green-led class', () => {
  const { queryByText } = render(<Display locked={false} />);
  const lock = queryByText(/unlocked/i);
  expect(lock).toBeInTheDocument();
  expect(lock).toHaveClass('green-led');
});

test('When locked or closed, use the red-led class', () => {
  const { queryByText } = render(<Display locked={true} />);
  const lock = queryByText(/locked/i);
  expect(lock).toBeInTheDocument();
  expect(lock).toHaveClass('red-led');
});

test('displays if gate is open/closed and if it is locked/unlocked', () => {
  expect(render(<Display locked={true} closed={true} />)).toMatchSnapshot();
});
