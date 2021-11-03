import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import NotFound from '../pages/NotFound';
import { MemoryRouter } from 'react-router-dom';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('test page NotFound', () => {
  it('Render component', () => {
    const component = render(<NotFound />);
    expect(
      component.getByText(
        'Parece que te perdiste el rumbo, dale click al boton de abajo.'
      )
    ).toBeTruthy();
  });
  it('Render boton', async () => {
    const component = render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    fireEvent.click(component.getByLabelText('return'));

    expect(mockHistoryPush).toHaveBeenCalled();
    expect(mockHistoryPush).toHaveBeenCalledWith('/login');
  });
});
