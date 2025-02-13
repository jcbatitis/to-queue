/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import Queues from '@/features/queues/queues';
import queuesReducer, { QueueState } from '@/features/queues/queues.slice';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { RootState } from '@/redux/store';

const initialState: QueueState = {
  queue: null,
  loading: false,
  error: null,
};

const preloadedState: RootState = {
  queues: initialState,
};

const mockStore = configureStore({
  reducer: {
    queues: queuesReducer,
  },
  preloadedState,
});

describe('Queues Component', () => {
  it('renders the queue view', () => {
    render(
      <Provider store={mockStore}>
        <Queues />
      </Provider>
    );
    expect(screen.getByText('This is the queues')).toBeInTheDocument();
  });
});
