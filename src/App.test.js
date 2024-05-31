import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

test('renders tic-tac-toe board', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Next player/i);
  expect(linkElement).toBeInTheDocument();
});

test('players can take turns', () => {
  const { getAllByRole, getByText } = render(<App />);
  const squares = getAllByRole('button', { name: '' }); // Only get squares (empty buttons)

  fireEvent.click(squares[0]);
  expect(squares[0].textContent).toBe('X');

  fireEvent.click(squares[1]);
  expect(squares[1].textContent).toBe('O');

  fireEvent.click(squares[2]);
  expect(squares[2].textContent).toBe('X');
});

test('can reset the game', () => {
  const { getAllByRole, getByText } = render(<App />);
  const squares = getAllByRole('button', { name: '' }); // Only get squares (empty buttons)
  const resetButton = getByText(/reset game/i);

  fireEvent.click(squares[0]);
  fireEvent.click(squares[1]);
  fireEvent.click(resetButton);

  // Check that all squares are empty after reset
  squares.forEach((square) => {
    expect(square.textContent).toBe('');
  });
});

test('determines the winner correctly', () => {
  const { getAllByRole, getByText } = render(<App />);
  const squares = getAllByRole('button', { name: '' }); // Only get squares (empty buttons)

  fireEvent.click(squares[0]); // X
  fireEvent.click(squares[3]); // O
  fireEvent.click(squares[1]); // X
  fireEvent.click(squares[4]); // O
  fireEvent.click(squares[2]); // X wins

  const status = getByText(/winner: X/i);
  expect(status).toBeInTheDocument();
});
