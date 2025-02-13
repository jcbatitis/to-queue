import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Queue from '@/components/ui/queue';
import * as Redux from 'react-redux';
import { RootState } from '@/redux/store';
import { act } from 'react';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

describe('Queue Component', () => {
  beforeEach(() => {
    jest
      .spyOn(Redux, 'useSelector')
      .mockImplementation((selector: (state: RootState) => unknown) => {
        if (selector.toString().includes('queues.loading')) {
          return false;
        }
        if (selector.toString().includes('queues.queue')) {
          return {
            name: 'Test Queue',
            description: 'This is a test queue description',
          };
        }
        return undefined;
      });
  });
  it('renders queue data correctly', async () => {
    await act(async () => {
      render(<Queue />);
    });
    expect(screen.getByText('Test Queue')).toBeInTheDocument();
    expect(
      screen.getByText('This is a test queue description')
    ).toBeInTheDocument();
  });
  it('does not render queue data when loading is true', async () => {
    jest
      .spyOn(Redux, 'useSelector')
      .mockImplementation((selector: (state: RootState) => unknown) => {
        const mockState: RootState = {
          queues: {
            queue: {
              name: 'Test Queue',
              description: 'This is a test queue description',
              is_finished: false,
              id: 0,
            },
            loading: true,
            error: null,
          },
        };
        return selector(mockState);
      });

    await act(async () => {
      render(<Queue />);
    });
    expect(screen.queryByText('Test Queue')).not.toBeInTheDocument();
    expect(
      screen.queryByText('This is a test queue description')
    ).not.toBeInTheDocument();
  });
});
