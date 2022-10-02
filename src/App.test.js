import { render, screen } from '@testing-library/react';
import App from './App';
import AddBookComp from "./features/books/AddBookComp";
import BooksComp from "./features/books/BooksComp";
import AddUserComp from "./features/users/AddUserComp";
import UsersComp from "./features/users/UsersComp";
import HomeComp from './HomeComp';

test('Redirects to login if not authenticated', () => {
  render(
    <App>
      <HomeComp />
    </App>
  );
  const loginElement = screen.getByTestId('login');
  expect(loginElement).toBeInTheDocument();
  expect(loginElement).toHaveTextContent('Login');
});

test('Redirects to login for unauthenticated to /add-book', () => {

  render(
    <App>
      <AddBookComp />
    </App>
  );
  
  const loginElement = screen.getByTestId('login');
  expect(loginElement).toBeInTheDocument();
  expect(loginElement).toHaveTextContent('Login');
});

test('Redirects to login for unauthenticated to /add-user', () => {

  render(
    <App>
      <AddUserComp/>
    </App>
  );
  
  const loginElement = screen.getByTestId('login');
  expect(loginElement).toBeInTheDocument();
  expect(loginElement).toHaveTextContent('Login');
});

test('Redirects to login for unauthenticated to /books', () => {

  render(
    <App>
      <BooksComp/>
    </App>
  );
  
  const loginElement = screen.getByTestId('login');
  expect(loginElement).toBeInTheDocument();
  expect(loginElement).toHaveTextContent('Login');
});

test('Redirects to login for unauthenticated to /users', () => {

  render(
    <App>
      <UsersComp/>
    </App>
  );
  
  const loginElement = screen.getByTestId('login');
  expect(loginElement).toBeInTheDocument();
  expect(loginElement).toHaveTextContent('Login');
});
