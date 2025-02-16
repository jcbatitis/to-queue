/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Queue from '@/components/ui/queue';
import * as Hooks from '@/hooks/hook'; // Import the hook module directly
import { act } from 'react';

jest.mock('../../../hooks/hook', () => ({
  ...jest.requireActual('../../../hooks/hook'),
  useAppSelector: jest.fn(),
}));

describe('Queue Component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Prevent state pollution between tests
  });
  it('renders queue data correctly', async () => {
    (Hooks.useAppSelector as unknown as jest.Mock).mockImplementation((selector) => {
      if (selector.toString().includes('queues.loading')) return false;
      if (selector.toString().includes('queues.queue'))
        return {
          name: 'Test Queue',
          description: 'This is a test queue description',
        };
      return undefined;
    });
    await act(async () => {
      render(<Queue />);
    });
    expect(screen.getByText('Test Queue')).toBeInTheDocument();
    expect(screen.getByText('This is a test queue description')).toBeInTheDocument();
  });

  it('does not render queue data when loading is true', async () => {
    (Hooks.useAppSelector as unknown as jest.Mock).mockImplementation((selector) => {
      if (selector.toString().includes('queues.loading')) return true;
      if (selector.toString().includes('queues.queue')) return null;
      return undefined;
    });

    await act(async () => {
      render(<Queue />);
    });

    expect(screen.queryByText('Test Queue')).not.toBeInTheDocument();
    expect(screen.queryByText('This is a test queue description')).not.toBeInTheDocument();
  });
});
