import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Controls from './Controls';

test('Controls renders correctly', () => {
  render(<Controls />);
});

test('Gate Locked and Closed returns can be unlocked, cannot be opened', () => {
  const toggleLockedMockSpy = jest.fn();
  const toggleClosedMockSpy = jest.fn();

  const { getByTestId } = render(
    <Controls locked={true} closed={true} toggleLocked={toggleLockedMockSpy} toggleClosed={toggleClosedMockSpy} />
  );
  fireEvent.click(getByTestId('lock-button'));
  expect(toggleLockedMockSpy).toHaveBeenCalledTimes(1);
  fireEvent.click(getByTestId('gate-button'));
  expect(toggleClosedMockSpy).toHaveBeenCalledTimes(0);
});

test('Gate Unlocked and Closed returns can be locked, can be opened', () => {
  const toggleLockedMockSpy = jest.fn();
  const toggleClosedMockSpy = jest.fn();

  const { getByTestId } = render(
    <Controls locked={false} closed={true} toggleLocked={toggleLockedMockSpy} toggleClosed={toggleClosedMockSpy} />
  );
  fireEvent.click(getByTestId('lock-button'));
  expect(toggleLockedMockSpy).toHaveBeenCalledTimes(1);
  fireEvent.click(getByTestId('gate-button'));
  expect(toggleClosedMockSpy).toHaveBeenCalledTimes(1);
});

test('Gate Unlocked and open, returns cannot be locked, can be closed', () => {
  const toggleLockedMockSpy = jest.fn();
  const toggleClosedMockSpy = jest.fn();

  const { getByTestId } = render(
    <Controls locked={false} closed={false} toggleLocked={toggleLockedMockSpy} toggleClosed={toggleClosedMockSpy} />
  );
  fireEvent.click(getByTestId('lock-button'));
  expect(toggleLockedMockSpy).toHaveBeenCalledTimes(0);
  fireEvent.click(getByTestId('gate-button'));
  expect(toggleClosedMockSpy).toHaveBeenCalledTimes(1);
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
