import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders API de Usuários text', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/API de Usuários/i);
  expect(linkElement).toBeInTheDocument();
});