import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BusRegistrationCard from '../components/BusRegistrationCard';

test('renders BusRegistrationCard component with bus information', () => {
  render(
    <BusRegistrationCard
      busName="Test Bus"
      busNumber="TEST123"
      capacity={50}
      busRoute="Test Route"
      onEdit={() => {}}
      onDelete={() => {}}
    />
  );

  // Check if the component and bus information is displayed
  expect(screen.getByText('Test Route')).toBeInTheDocument();
  expect(screen.getByText('Bus Name: Test Bus')).toBeInTheDocument();
  expect(screen.getByText('Bus Number: TEST123')).toBeInTheDocument();
  expect(screen.getByText('Capacity: 50')).toBeInTheDocument();
});

test('opens and closes the delete modal', () => {
  render(
    <BusRegistrationCard
      busName="Test Bus"
      busNumber="TEST123"
      capacity={50}
      busRoute="Test Route"
      onEdit={() => {}}
      onDelete={() => {}}
    />
  );


  // In the initial state, Delete modal should be closed
  expect(screen.queryByText('Delete Bus')).not.toBeInTheDocument();

  // Click the Delete button to open the modal
  fireEvent.click(screen.getByText('Delete'));

  // After clicking, the Delete modal should be open
  expect(screen.getByText('Delete Bus')).toBeInTheDocument();

  // Click the Cancel button to close the modal
  fireEvent.click(screen.getByText('Cancel'));

  // After clicking Cancel, the Delete modal should be closed again
  expect(screen.queryByText('Delete Bus')).not.toBeInTheDocument();
});
