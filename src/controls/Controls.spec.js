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
