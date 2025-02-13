import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getMockedQueue } from '@/features/queues/queues.actions';
import { Queue } from '@/features/queues/queues.types';

export interface QueueState {
  queue: Queue | null;
  loading: boolean;
  error: string | null;
}

const initialState: QueueState = {
  queue: null,
  loading: false,
  error: null,
};

export const fetchQueue = createAsyncThunk('queues/fetchQueue', async () => {
  const data = await getMockedQueue();
  console.log(data);
  return data;
});

const queuesSlice = createSlice({
  name: 'queues',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQueue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQueue.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.queue = action.payload;
      })
      .addCase(fetchQueue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export default queuesSlice.reducer;
