/**
 * @jest-environment jsdom
 */
import { fireEvent, screen, waitFor } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import Queues from '@/features/queues/queues';
import { renderWithProviders } from '@/utils/test-utils';
import { setupStore } from '@/redux/store';
import { getMockedQueue } from '@/features/queues/queues.actions';

jest.mock('../../../features/queues/queues.actions', () => ({
  getMockedQueue: jest.fn(),
}));

// jest.mock('../../../features/queues/queues.slice', () => ({
//   ...jest.requireActual('../../../features/queues/queues.slice'),
//   fetchQueue: jest.fn(),
// }));

describe('Queues Component', () => {
  let mockStore: ReturnType<typeof createTestStore>;
  const createTestStore = () => setupStore();
  beforeEach(() => {
    mockStore = createTestStore();
    jest.clearAllMocks();
  });
  it('should load queue data upon initialisation', async () => {
    const mockData = { name: 'Test Queue', id: 1 };
    (getMockedQueue as jest.Mock).mockResolvedValue(mockData);
    const { getByTestId } = renderWithProviders(<Queues />, { store: mockStore });
    await waitFor(() => {
      const skeleton = getByTestId('queue-skeleton');
      expect(skeleton).toBeInTheDocument();
    });
    const state = mockStore.getState().queues;
    expect(state).toEqual({
      queue: mockData,
      loading: false,
      error: null,
    });
    expect(getByTestId('queue')).toBeInTheDocument();
    expect(screen.getByText('Test Queue')).toBeInTheDocument();
  });
  it('list should refresh upon clicking refresh', async () => {
    const mockData = { name: 'Test Queue', id: 1 };
    (getMockedQueue as jest.Mock).mockResolvedValue(mockData);
    const { getByTestId } = renderWithProviders(<Queues />, { store: mockStore });

    await waitFor(() => {
      const button = getByTestId('refresh');
      expect(button).toBeInTheDocument();
      fireEvent.click(button);
    });

    const queue = getByTestId('queue');
    expect(queue).toBeInTheDocument();
    expect(getMockedQueue).toHaveBeenCalledTimes(1);
    expect(screen.getByText('Test Queue')).toBeInTheDocument();
  });
});
