import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

/**
 * @function App
 */

test('submits form with valid data', async () => {
    render(<App />);
    userEvent.type(screen.getByLabelText(/Prénom/i), 'John');
    userEvent.type(screen.getByLabelText(/Nom de famille/i), 'Doe');
    userEvent.type(screen.getByLabelText(/Email/i), 'john.doe@example.com');
    userEvent.type(screen.getByLabelText(/Date de naissance/i), '1990-01-01');
    userEvent.type(screen.getByLabelText(/Ville/i), 'Paris');
    userEvent.type(screen.getByLabelText(/Code postal/i), '75001');
    userEvent.click(screen.getByRole('button', { name: /S'inscrire/i }));
    expect(screen.getByTestId('count')).toHaveTextContent("1");

});

/*
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByRole("link");
  expect(linkElement).toBeInTheDocument();
  expect(linkElement).toHaveTextContent("Learn React");
});

test('renders code app', () => {
  render(<App />);
  const codeElement = screen.getByTestId("code-app");
  expect(codeElement).toBeInTheDocument();
  expect(codeElement).toHaveTextContent("src/App.js");
});

test('check counter on click me button', () => {
  render(<App />);
  const button = screen.getByRole('button');
  const counter = screen.getByTestId('count')
  expect(button).toBeInTheDocument();
  expect(counter).toBeInTheDocument();
  expect(counter).toHaveTextContent("0");
  fireEvent.click(button);
  expect(counter).toHaveTextContent("1");
});
*/
