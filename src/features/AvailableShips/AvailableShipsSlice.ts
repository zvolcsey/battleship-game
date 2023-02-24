import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import type { IAvailableShips } from '../../app/types';
import type { IShips } from '../../app/types';

const ships: IShips[] = [
  { type: 'Patrol Boat', resourceId: 'something1' },
  { type: 'Patrol Boat', resourceId: 'something2' },
  { type: 'Patrol Boat', resourceId: 'something3' },
  { type: 'Patrol Boat', resourceId: 'something4' },
  { type: 'Submarine', resourceId: 'something5' },
  { type: 'Submarine', resourceId: 'something6' },
  { type: 'Destroyer', resourceId: 'something7' },
  { type: 'Battleship', resourceId: 'something8' },
  { type: 'Carrier', resourceId: 'something9' },
];

const initialState: IAvailableShips = {
  availableShips: ships,
  totalAvailableShips: ships.length,
};

export const availableShipsSlice = createSlice({
  name: 'AvailableShipsSlice',
  initialState,
  reducers: {
    decreaseShipsCount(state, action) {
      // TODO
    },
    reset(state, action) {
      // TODO
    },
  },
});

export const { decreaseShipsCount, reset } = availableShipsSlice.actions;

export const selectAvailableShips = (state: RootState) =>
  state.availableShips.availableShips;
export const selectTotalAvailableShips = (state: RootState) =>
  state.availableShips.totalAvailableShips;

export default availableShipsSlice.reducer;
