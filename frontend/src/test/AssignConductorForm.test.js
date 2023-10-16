import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AssignConductorForm from '../components/AssignConductorForm';

test('renders AssignConductorForm component', () => {
  render(<AssignConductorForm />);
  const conductorNameInput = screen.getByPlaceholderText('Conductor Name');
  const busNumberInput = screen.getByPlaceholderText('Bus Number');
  expect(conductorNameInput).toBeInTheDocument();
  expect(busNumberInput).toBeInTheDocument();
});

test('filters conductor list as user types', () => {
  render(<AssignConductorForm />);
  const conductorNameInput = screen.getByPlaceholderText('Conductor Name');

  // Simulate user typing "John" into the input field
  fireEvent.change(conductorNameInput, { target: { value: 'John' } });

  // Check if the list of filtered conductors is displayed
  const filteredConductors = screen.getByText('John Doe');
  expect(filteredConductors).toBeInTheDocument();
});

test('filters bus list as user types', () => {
  render(<AssignConductorForm />);
  const busNumberInput = screen.getByPlaceholderText('Bus Number');

  // Simulate user typing "Bus123" into the input field
  fireEvent.change(busNumberInput, { target: { value: 'Bus123' } });

  // Check if the list of filtered buses is displayed
  const filteredBuses = screen.getByText('Bus123');
  expect(filteredBuses).toBeInTheDocument();
});

test('handles assigning a conductor to a bus', async () => {
  render(<AssignConductorForm />);
  const conductorNameInput = screen.getByPlaceholderText('Conductor Name');
  const busNumberInput = screen.getByPlaceholderText('Bus Number');
  const assignButton = screen.getByText('Assign');

  // Simulate user typing and selecting a conductor
  fireEvent.change(conductorNameInput, { target: { value: 'John' } });
  const conductorItem = screen.getByText('John Doe');
  fireEvent.click(conductorItem);

  // Simulate user typing and selecting a bus
  fireEvent.change(busNumberInput, { target: { value: 'Bus123' } });
  const busItem = screen.getByText('Bus123');
  fireEvent.click(busItem);

  // Simulate user clicking the "Assign" button
  fireEvent.click(assignButton);

  // Wait for the assignment to complete
  await waitFor(() => {
    const assignedMessage = screen.getByText('Conductor assigned successfully');
    expect(assignedMessage).toBeInTheDocument();
  });
});
