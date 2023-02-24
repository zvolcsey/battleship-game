import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import gameSlice from '../features/Game/GameSlice';
import availableShipsSlice from '../features/AvailableShips/AvailableShipsSlice';

export const store = configureStore({
  reducer: {
    game: gameSlice,
    availableShips: availableShipsSlice,
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
