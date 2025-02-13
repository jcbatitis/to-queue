import { configureStore } from '@reduxjs/toolkit';
import queueReducer, { fetchQueue } from '@/features/queues/queues.slice';
import { getMockedQueue } from '@/features/queues/queues.actions';

/**
 * This creates a mock functions of queue actions
 */
jest.mock('../../../features/queues/queues.actions', () => ({
  getMockedQueue: jest.fn(),
}));

describe('Queue Slice', () => {
  let store: ReturnType<typeof createTestStore>;
  const createTestStore = () =>
    configureStore({
      reducer: {
        queue: queueReducer,
      },
    });
  beforeEach(() => {
    store = createTestStore();
    jest.clearAllMocks();
  });
  it('should have the correct initial state', () => {
    const state = store.getState().queue;
    expect(state).toEqual({
      queue: null,
      loading: false,
      error: null,
    });
  });
  it('should handle fetchQueue.pending', async () => {
    store.dispatch(fetchQueue.pending('', undefined));
    const state = store.getState().queue;
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });
  it('should handle fetchQueue.fulfilled', async () => {
    const mockData = { name: 'Test Queue', id: 1 };
    (getMockedQueue as jest.Mock).mockResolvedValue(mockData);
    await store.dispatch(fetchQueue());
    const state = store.getState().queue;
    expect(state.loading).toBe(false);
    expect(state.queue).toEqual(mockData);
    expect(state.error).toBeNull();
  });
  it('should handle fetchQueue.rejected', async () => {
    const mockError = new Error('Failed to fetch');
    (getMockedQueue as jest.Mock).mockRejectedValue(mockError);
    await store.dispatch(fetchQueue());
    const state = store.getState().queue;
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Failed to fetch');
    expect(state.queue).toBeNull();
  });
  it('should handle no error message through fetchQueue.rejected', async () => {
    const mockError = new Error(undefined);
    (getMockedQueue as jest.Mock).mockRejectedValue(mockError);
    await store.dispatch(fetchQueue());
    const state = store.getState().queue;
    expect(state.loading).toBe(false);
    expect(state.error).toBe('An error occurred');
    expect(state.queue).toBeNull();
  });
});
