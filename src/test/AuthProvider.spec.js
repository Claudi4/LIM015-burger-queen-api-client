import fetchMock from 'jest-fetch-mock';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import AuthProvider, { AuthContext } from '../services/auth/AuthProvider';
import { act } from 'react-dom/test-utils';

fetchMock.enableMocks();

let response;

beforeEach(() => {
  fetch.resetMocks();
  render(
    <AuthProvider>
      <AuthContext.Consumer>
        {(value) => (
          <>
            <span>Is logged in: {value.isLogged().toString()}</span>
            {value.isLogged() && <span> Rol: {value.urlRol().toString()}</span>}
            <button
              onClick={() => {
                value.login(adminUser.email, 'Admin#123456').then((resp) => {
                  response = resp;
                });
              }}
            >
              Login
            </button>
            <button
              onClick={() => value.logout()}
            >
              Logout
            </button>
          </>
        )}
      </AuthContext.Consumer>
    </AuthProvider>
  );
});

const adminUser = {
  _id: '123456',
  email: 'admin@gmail.com',
  roles: {
    rol: 'admin',
    admin: true,
  },
};

const waiterUser = {
  _id: '123456',
  email: 'waiter@gmail.com',
  roles: {
    rol: 'mesero',
    admin: false,
  },
};

describe('Auth Provider', () => {
  it('user null', () => {
    expect(screen.getByText('Is logged in: false')).toBeTruthy();
  });
  it('should return user to true', async () => {
    fetch.mockResponseOnce(JSON.stringify({ token: 'admin123456' }));
    fetch.mockResponseOnce(JSON.stringify(adminUser));
    await act(async () => {
      fireEvent.click(screen.getByText('Login'));
    });
    expect(screen.getByText('Is logged in: true')).toBeTruthy();
    expect(screen.getByText('Rol: /admin')).toBeTruthy();
    expect({ ...adminUser, token: 'admin123456' }).toEqual(response);
  });
  it('set user to null', async () => {
    await act(async () => {
      fireEvent.click(screen.getByText('Logout'));
    });
    expect(screen.getByText('Is logged in: false')).toBeTruthy();
  });
  it('should return waiter user to true', async () => {
    fetch.mockResponseOnce(JSON.stringify({ token: 'waiter123456' }));
    fetch.mockResponseOnce(JSON.stringify(waiterUser));
    await act(async () => {
      fireEvent.click(screen.getByText('Login'));
    });
    expect(screen.getByText('Is logged in: true')).toBeTruthy();
    expect(screen.getByText('Rol: /waiter')).toBeTruthy();
    expect({ ...waiterUser, token: 'waiter123456' }).toEqual(response);
  });
});
