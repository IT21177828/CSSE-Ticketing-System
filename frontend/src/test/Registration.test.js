import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import Registration from '../pages/Registration';
import axios from 'axios';

jest.mock('axios');

describe('Registration Component', () => {
  test('renders Registration form', () => {
    render(<Registration />);
    const nameInput = screen.getByPlaceholderText('Your full name');
    const emailInput = screen.getByPlaceholderText('name@company.com');
    const contactInput = screen.getByPlaceholderText('Your contact number');
    const passwordInput = screen.getByPlaceholderText('••••••••');
    const confirmPasswordInput = screen.getByPlaceholderText('••••••••');
    const submitButton = screen.getByText('Create an account');

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(contactInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test('displays error when passwords do not match', async () => {
    render(<Registration />);
    const nameInput = screen.getByPlaceholderText('Your full name');
    const emailInput = screen.getByPlaceholderText('name@company.com');
    const contactInput = screen.getByPlaceholderText('Your contact number');
    const passwordInput = screen.getByPlaceholderText('••••••••');
    const confirmPasswordInput = screen.getByPlaceholderText('••••••••');
    const submitButton = screen.getByText('Create an account');

    fireEvent.change(nameInput, { target: { name: 'name', value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { name: 'email', value: 'test@example.com' } });
    fireEvent.change(contactInput, { target: { name: 'contact', value: '1234567890' } });
    fireEvent.change(passwordInput, { target: { name: 'password', value: 'password' } });
    fireEvent.change(confirmPasswordInput, { target: { name: 'confirmPassword', value: 'mismatched' } });
    fireEvent.click(submitButton);

    const errorText = await screen.findByText("Password and confirm password don't match");
    expect(errorText).toBeInTheDocument();
  });

  test('displays error when contact number has incorrect length', async () => {
    render(<Registration />);
    const nameInput = screen.getByPlaceholderText('Your full name');
    const emailInput = screen.getByPlaceholderText('name@company.com');
    const contactInput = screen.getByPlaceholderText('Your contact number');
    const passwordInput = screen.getByPlaceholderText('••••••••');
    const confirmPasswordInput = screen.getByPlaceholderText('••••••••');
    const submitButton = screen.getByText('Create an account');

    fireEvent.change(nameInput, { target: { name: 'name', value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { name: 'email', value: 'test@example.com' } });
    fireEvent.change(contactInput, { target: { name: 'contact', value: '12345' } });
    fireEvent.change(passwordInput, { target: { name: 'password', value: 'password' } });
    fireEvent.change(confirmPasswordInput, { target: { name: 'confirmPassword', value: 'password' } });
    fireEvent.click(submitButton);

    const errorText = await screen.findByText('Contact number must be exactly 10 digits');
    expect(errorText).toBeInTheDocument();
  });

  test('submits the form with valid data', async () => {
    axios.post.mockResolvedValue({ data: 'Registration successful' });

    render(<Registration />);
    const nameInput = screen.getByPlaceholderText('Your full name');
    const emailInput = screen.getByPlaceholderText('name@company.com');
    const contactInput = screen.getByPlaceholderText('Your contact number');
    const passwordInput = screen.getByPlaceholderText('••••••••');
    const confirmPasswordInput = screen.getByPlaceholderText('••••••••');
    const submitButton = screen.getByText('Create an account');

    fireEvent.change(nameInput, { target: { name: 'name', value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { name: 'email', value: 'test@example.com' } });
    fireEvent.change(contactInput, { target: { name: 'contact', value: '1234567890' } });
    fireEvent.change(passwordInput, { target: { name: 'password', value: 'password' } });
    fireEvent.change(confirmPasswordInput, { target: { name: 'confirmPassword', value: 'password' } });
    fireEvent.click(submitButton);

    // Wait for the form submission and redirect
    await waitFor(() => {
      const successMessage = screen.getByText('Registration successful');
      expect(successMessage).toBeInTheDocument();
    });
  });

  test('handles form submission errors', async () => {
    axios.post.mockRejectedValue({ response: { data: 'Registration failed' } });

    render(<Registration />);
    const nameInput = screen.getByPlaceholderText('Your full name');
    const emailInput = screen.getByPlaceholderText('name@company.com');
    const contactInput = screen.getByPlaceholderText('Your contact number');
    const passwordInput = screen.getByPlaceholderText('••••••••');
    const confirmPasswordInput = screen.getByPlaceholderText('••••••••');
    const submitButton = screen.getByText('Create an account');

    fireEvent.change(nameInput, { target: { name: 'name', value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { name: 'email', value: 'test@example.com' } });
    fireEvent.change(contactInput, { target: { name: 'contact', value: '1234567890' } });
    fireEvent.change(passwordInput, { target: { name: 'password', value: 'password' } });
    fireEvent.change(confirmPasswordInput, { target: { name: 'confirmPassword', value: 'password' } });
    fireEvent.click(submitButton);

    // Wait for the form submission and handle errors
    await waitFor(() => {
      const errorMessage = screen.getByText('Registration failed');
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
