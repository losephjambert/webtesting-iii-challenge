import React from 'react';
import { render, queryByText } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Display from './Display';

test('Display renders correctly', () => {
  render(<Display />);
});

test('Display locked if locked prop is true. Display unlocked if locked prop is false', () => {
  const { getByText, queryByText } = render(<Display locked={false} />);
  expect(getByText(/unlocked/i));
  expect(queryByText(/^locked/i)).toBeFalsy();
});

test("Class should be 'green-led' if unlocked or open", () => {
  const { queryByText } = render(<Display locked={false} />);
  const lock = queryByText(/unlocked/i);
  expect(lock).toBeInTheDocument();
  expect(lock).toHaveClass('green-led');
});

test("Class should be 'red-led' if unlocked or open", () => {
  const { queryByText } = render(<Display locked={true} />);
  const lock = queryByText(/locked/i);
  expect(lock).toBeInTheDocument();
  expect(lock).toHaveClass('red-led');
});
