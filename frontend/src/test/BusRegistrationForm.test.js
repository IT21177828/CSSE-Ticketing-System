import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react'; // Import necessary functions
import BusRegistrationForm from '../components/BusRegistrationForm';


// test('renders BusRegistrationForm component', () => {
//   render(<BusRegistrationForm />);
//   const busRegistrationForm = screen.getByTestId('busregister-1'); // Use the appropriate test ID
//   expect(busRegistrationForm).toBeInTheDocument();
// });




// Mock Axios for testing
jest.mock('axios');

test('renders BusRegistrationForm component', () => {
  render(<BusRegistrationForm />);
  const busRegistrationForm = screen.getByTestId('busregister-1');
  expect(busRegistrationForm).toBeInTheDocument();
});

test('renders input fields', () => {
  render(<BusRegistrationForm />);
  expect(screen.getByLabelText('Bus Name')).toBeInTheDocument();
  expect(screen.getByLabelText('Bus Number')).toBeInTheDocument();
  expect(screen.getByLabelText('Capacity')).toBeInTheDocument();
  expect(screen.getByLabelText('Bus Route')).toBeInTheDocument();
  expect(screen.getByLabelText('Root Distance')).toBeInTheDocument();
});

test('submits the form with valid data', async () => {
  // Mock the axios post function to simulate a successful response
  const axios = require('axios');
  axios.post.mockResolvedValue({ status: 200 });

  render(<BusRegistrationForm />);

  // Fill out the form with valid data
  fireEvent.change(screen.getByLabelText('Bus Name'), { target: { value: 'Test Bus' } });
  fireEvent.change(screen.getByLabelText('Bus Number'), { target: { value: 'TEST123' } });
  fireEvent.change(screen.getByLabelText('Capacity'), { target: { value: '50' } });
  fireEvent.change(screen.getByLabelText('Bus Route'), { target: { value: 'Test Route' } });
  fireEvent.change(screen.getByLabelText('Root Distance'), { target: { value: '25' } });

  // Submit the form
  fireEvent.click(screen.getByRole('button', { name: /Create Bus/ })); // Use click instead of submit

  // Wait for the Axios request to resolve
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

  // Assert redirection after a successful submission
  expect(window.location.href).toBe('/card');
});
