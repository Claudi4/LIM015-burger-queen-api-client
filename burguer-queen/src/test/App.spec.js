import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders login app', () => {
  render(<App />);
  const linkElement = screen.getByText('Iniciar sesión');
  expect(linkElement).toBeInTheDocument();
});