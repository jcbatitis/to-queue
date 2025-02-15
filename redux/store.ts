import queuesReducer from '../features/queues/queues.slice';
import {
  combineReducers,
  configureStore,
  createListenerMiddleware,
} from '@reduxjs/toolkit';

// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineReducers({
  queues: queuesReducer,
});

// Add this middleware to trigger change event rather than calling useEffect
const listenerMiddleWare = createListenerMiddleware();

export function setupStore(preloadedState?: Partial<RootState>) {
  const store = configureStore({
    reducer: rootReducer,
    // Add this middleware to trigger change event rather than calling useEffect
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(listenerMiddleWare.middleware),
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState,
  });
  return store;
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

// Add this middleware to trigger change event rather than calling useEffect
// https://www.youtube.com/watch?v=I7g363Faxa4
// listenerMiddleWare.startListening.withTypes<RootState, AppDispatch>()({
//   predicate: (_action, currentState, previousState) => {
//     return currentState.pokemon.search !== previousState.pokemon.search;
//   },
//   effect: async (_action, listenerApi) => {
// Adds delay
// listenerApi.cancelActiveListeners();
// await listenerApi.delay(500);
//     const pokemon = await pokemonSearch(listenerApi.getState().pokemon.search);
//     listenerApi.dispatch(pokemonUpdated(pokemon));
//   },
// });
