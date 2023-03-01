import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import type { DragStatus, IAvailableShipsState } from '../../app/types';
import type { IShip } from '../../app/types';

const ships: IShip[] = [
  { type: 'Patrol Boat', resourceId: 'something1', size: 2 },
  { type: 'Patrol Boat', resourceId: 'something2', size: 2 },
  { type: 'Patrol Boat', resourceId: 'something3', size: 2 },
  { type: 'Patrol Boat', resourceId: 'something4', size: 2 },
  { type: 'Submarine', resourceId: 'something5', size: 3 },
  { type: 'Submarine', resourceId: 'something6', size: 3 },
  { type: 'Destroyer', resourceId: 'something7', size: 3 },
  { type: 'Battleship', resourceId: 'something8', size: 4 },
  { type: 'Carrier', resourceId: 'something9', size: 5 },
];

const initialState: IAvailableShipsState = {
  availableShips: ships,
  totalAvailableShips: ships.length,
  dragStatus: 'idle',
  selectedShip: null,
};

export const availableShipsSlice = createSlice({
  name: 'AvailableShipsSlice',
  initialState,
  reducers: {
    increaseShipsCount(state) {
      state.totalAvailableShips = state.totalAvailableShips + 1;
    },
    decreaseShipsCount(state) {
      state.totalAvailableShips = state.totalAvailableShips - 1;
    },
    addShip(state, action) {
      // TODO
    },
    removeShip(state, action: PayloadAction<string>) {
      state.availableShips = state.availableShips.filter(
        (ship) => ship.resourceId !== action.payload
      );
    },
    reset(state, action) {
      // TODO
    },
    changeDragStatus(state, action: PayloadAction<DragStatus>) {
      state.dragStatus = action.payload;
    },
    selectShip(state, action: PayloadAction<IShip>) {
      state.selectedShip = action.payload;
    },
  },
});

export const {
  increaseShipsCount,
  decreaseShipsCount,
  reset,
  changeDragStatus,
  addShip,
  removeShip,
  selectShip,
} = availableShipsSlice.actions;

export const selectAvailableShips = (state: RootState) =>
  state.availableShips.availableShips;
export const selectTotalAvailableShips = (state: RootState) =>
  state.availableShips.totalAvailableShips;
export const selectDragStatus = (state: RootState) =>
  state.availableShips.dragStatus;
export const selectSelectedShip = (state: RootState) =>
  state.availableShips.selectedShip;

export default availableShipsSlice.reducer;
