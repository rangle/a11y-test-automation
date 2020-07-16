import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders an h1', () => {
  const { getByText } = render(<App />);
  const header = getByText(/The Demo/i);
  expect(header).toBeInTheDocument();
});
