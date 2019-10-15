import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Controls from './Controls';

test('Controls renders correctly', () => {
  render(<Controls />);
});

test('Gate cannot be closed or opened if it is locked', () => {
  const toggleLockedMockSpy = jest.fn();
  const toggleClosedMockSpy = jest.fn();

  const { getByTestId } = render(
    <Controls locked={true} toggleLocked={toggleLockedMockSpy} toggleClosed={toggleClosedMockSpy} />
  );

  fireEvent.click(getByTestId('gate-button'));
  expect(toggleClosedMockSpy).toHaveBeenCalledTimes(0);
});

test(`Lock button displays 'unlock gate' if gate is locked`, () => {
  const { getByText, queryByText } = render(<Controls locked={true} />);
  expect(getByText(/unlock gate/i));
  expect(queryByText(/^lock gate/i)).toBeFalsy();
});

test(`Close button displays 'open gate' if gate is closed`, () => {
  const { getByText, queryByText } = render(<Controls closed={true} />);
  expect(getByText(/open gate/i));
  expect(queryByText(/^close gate/i)).toBeFalsy();
});

test('the closed toggle button is disabled if the gate is locked', () => {
  const { getByTestId } = render(<Controls locked={true} />);
  const container = getByTestId('gate-button');
  expect(container).toBeDisabled();
});

test('the locked toggle button is disabled if the gate is open', () => {
  const { getByTestId } = render(<Controls closed={false} />);
  const container = getByTestId('lock-button');
  expect(container).toBeDisabled();
});
