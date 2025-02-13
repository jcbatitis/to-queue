import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Queue from '@/components/ui/queue';
import * as Redux from 'react-redux';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

describe('Queue Component', () => {
  beforeEach(() => {
    jest.spyOn(Redux, 'useSelector').mockReturnValue({
      name: 'Test Queue',
      description: 'This is a test queue description',
    });
  });

  it('renders queue data correctly', () => {
    // Mock Redux state
    render(<Queue />);

    expect(screen.getByText('Test Queue')).toBeInTheDocument();
    expect(
      screen.getByText('This is a test queue description')
    ).toBeInTheDocument();
  });
});
