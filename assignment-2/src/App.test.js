import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const headingElement = screen.getByText(/Home Page of my site/i); // site was taken down so only on local drive now
  expect(headingElement).toBeInTheDocument();
});
