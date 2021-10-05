// import { hasExpectedRequestMetadata } from '@reduxjs/toolkit/dist/matchers';
// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

import reducer, { changeIsAuthenticated, setActiveUserId } from './components/Home/usersSlice'

// reducer tests
test('should return initial state', () => {
  expect(reducer(undefined, {})).toEqual(
    {
      activeUserId: undefined,
      isAuthenticated: false
    }
  )
})

test('should change isAuthenticated to true', () => {
  const previousState = { activeUserId: undefined, isAuthenticated: false }
  expect(reducer(previousState, changeIsAuthenticated(true))).toEqual({
    activeUserId: undefined,
    isAuthenticated: true
  })
})

test('should set active user id', () => {
  const previousState = { activeUserId: undefined, isAuthenticated: false }
  expect(reducer(previousState, setActiveUserId('AcTiVeUsEr'))).toEqual({
    activeUserId: 'AcTiVeUsEr',
    isAuthenticated: false
  })
})

