// import {render, screen, cleanup} from '@testing-library/react';
// import BusRegistrationForm from './BusRegistrationForm';

// test('should render busregister component', () => { 
//     render(<BusRegistrationForm />);
//     const busregisterElement = screen.getByTestId('busregister-1');
//     expect(busregisterElement).toBeInTheDocument();
//     expect(busregisterElement).toHaveTextContent('Bus Registration Form');
// })



import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import BusRegistrationForm from './BusRegistrationForm';

jest.mock('axios'); // Mock Axios for testing

describe('BusRegistrationForm', () => {
  test('renders the form with input fields', () => {
    render(<BusRegistrationForm />);
    
    
    expect(screen.getByLabelText('Bus Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Bus Number')).toBeInTheDocument();
    expect(screen.getByLabelText('Capacity')).toBeInTheDocument();
    expect(screen.getByLabelText('Bus Route')).toBeInTheDocument();
    expect(screen.getByLabelText('Root Distance')).toBeInTheDocument();
  });

  test('submits the form with valid data', async () => {
  
    axios.post.mockResolvedValue({ status: 200 });

    render(<BusRegistrationForm />);

    
    fireEvent.change(screen.getByLabelText('Bus Name'), { target: { value: 'Test Bus' } });
    fireEvent.change(screen.getByLabelText('Bus Number'), { target: { value: 'TEST123' } });
    fireEvent.change(screen.getByLabelText('Capacity'), { target: { value: '50' } });
    fireEvent.change(screen.getByLabelText('Bus Route'), { target: { value: 'Test Route' } });
    fireEvent.change(screen.getByLabelText('Root Distance'), { target: { value: '25' } });

    fireEvent.submit(screen.getByRole('button', { name: /Create Bus/ }));

   
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:5050/bus', {
        busName: 'Test Bus',
        busNumber: 'TEST123',
        driverId: null,
        conductId: null,
        capacity: 50,
        routeName: 'Test Route',
        rootDistance: 25,
      });
    });

    
    expect(window.location.href).toBe('/card');
  });

  test('displays an error message on submission failure', async () => {
   
    axios.post.mockRejectedValue({ response: { data: 'Error message' } });

    render(<BusRegistrationForm />);

    fireEvent.submit(screen.getByRole('button', { name: /Create Bus/ }));

    
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
    });

    
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });
});

