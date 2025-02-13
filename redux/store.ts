import queuesReducer from '../features/queues/queues.slice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    queues: queuesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
