import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import GameSlice from '../features/Game/GameSlice';

export const store = configureStore({
  reducer: {
    game: GameSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
