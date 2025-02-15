/**
 * @jest-environment jsdom
 */
import { screen } from '@testing-library/react';
import React, { act } from 'react';
import '@testing-library/jest-dom';
import Queues from '@/features/queues/queues';
import { renderWithProviders } from '@/utils/test-utils';
import { setupStore } from '@/redux/store';
import { fetchQueue } from '@/features/queues/queues.slice';

jest.useFakeTimers();

describe('Queues Component', () => {
  it('renders loading skeleton when data is not yet loaded', async () => {
    const store = setupStore();
    renderWithProviders(<Queues />, { store });
    const skeletonContainer = screen.getByTestId('queue-skeleton');
    expect(skeletonContainer).toBeInTheDocument();
  });

  it('hides loading skeleton when data is available', async () => {
    const mockStore = setupStore();
    await act(async () => {
      mockStore.dispatch(fetchQueue());
      renderWithProviders(<Queues />, { store: mockStore });
      jest.runAllTimers();
    });

    expect(screen.queryByTestId('queue-skeleton')).not.toBeInTheDocument();
    expect(screen.getByText('Clean kitchen')).toBeInTheDocument();
  });
});
