/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import Queue from '@/components/queue';

describe('Button Component', () => {
  it('renders the button for type button', () => {
    render(<Queue />);
    expect(screen.getByText('This is the queue')).toBeInTheDocument();
  });
});
