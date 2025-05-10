import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import useVehicles from './hooks/useVehicles';

jest.mock('./hooks/useVehicles');

describe('Componente App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve chamar a função refetch a cada 2 minutos', () => {
    jest.useFakeTimers(); 

    const refetchMock = jest.fn();

    (useVehicles as jest.Mock).mockReturnValue({
      data: {
        statusCode: 200,
        message: "Lista de veículos",
        vehicles: [],
        locationVehicles: [],
        totalPages: 1,
        page: 1,
        perPage: "20"
      },
      refetch: refetchMock,
      isLoading: false,
      isError: false,
    });

    render(<App />);

    jest.advanceTimersByTime(120000);

    expect(refetchMock).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(120000);

    expect(refetchMock).toHaveBeenCalledTimes(2);

    jest.useRealTimers(); 
  });
});
