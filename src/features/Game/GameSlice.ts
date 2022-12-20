import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AVAILABLE_SHIPS, BOARD_SIZE, ALPHABETS } from '../../app/constants';
import { RootState } from '../../app/store';
import { getRandomIntCoordinate } from '../../utils/utils';

import type { GameState, Coordinates } from '../../app/types';

const initialState: GameState = {
  phase: 'Setup',
  yourBoard: null,
  opponentsBoard: null,
  availableShips: AVAILABLE_SHIPS,
  playerShipsOnBoard: AVAILABLE_SHIPS,
  computerShipsOnBoard: AVAILABLE_SHIPS,
  turn: 'Your',
  turns: 1,
  yourAttacks: [],
  opponentsAttacks: [],
};

export const gameSlice = createSlice({
  name: 'GameSlice',
  initialState,
  reducers: {
    changePhase(state, action) {
      state.phase = action.payload;
    },
    addYourBoard(state, action) {
      state.yourBoard = action.payload;
    },
    addOpponentsBoard(state, action) {
      state.opponentsBoard = action.payload;
    },
    addShipToBoard(state, action: PayloadAction<Coordinates>) {
      if (
        state.yourBoard &&
        state.yourBoard[action.payload.y][action.payload.x] !== 'S1'
      ) {
        state.yourBoard[action.payload.y][action.payload.x] = 'S1';
        state.availableShips--;
      }
    },
    addRandomYourShips(state) {
      const max = BOARD_SIZE - 1;
      for (let i = 0; i < state.availableShips; i++) {
        let coordinates = getRandomIntCoordinate(max);
        if (state.yourBoard) {
          while (state.yourBoard[coordinates.y][coordinates.x] === 'S1') {
            coordinates = getRandomIntCoordinate(max);
          }
          state.yourBoard[coordinates.y][coordinates.x] = 'S1';
        }
      }
      state.availableShips = 0;
    },
    addRandomEnemyShips(state) {
      const max = BOARD_SIZE - 1;
      for (let i = 0; i < AVAILABLE_SHIPS; i++) {
        let coordinates = getRandomIntCoordinate(max);
        if (state.opponentsBoard) {
          while (state.opponentsBoard[coordinates.y][coordinates.x] === 'S1') {
            coordinates = getRandomIntCoordinate(max);
          }
          state.opponentsBoard[coordinates.y][coordinates.x] = 'S1';
        }
      }
    },
    attack(state, action: PayloadAction<Coordinates>) {
      if (state.opponentsBoard) {
        if (state.opponentsBoard[action.payload.y][action.payload.x] !== 'S1') {
          state.opponentsBoard[action.payload.y][action.payload.x] = 1;
          state.turn = 'Computer';
          state.yourAttacks.push(
            `${ALPHABETS[action.payload.y]}${action.payload.x}`
          );
        } else {
          state.opponentsBoard[action.payload.y][action.payload.x] = 'sink';
          state.yourAttacks.push(
            `${ALPHABETS[action.payload.y]}${action.payload.x}`
          );
          state.phase = 'End';
        }
      }
    },
    randomAttack(state) {
      const max = BOARD_SIZE - 1;
      if (state.yourBoard) {
        let coordinates = getRandomIntCoordinate(max);
        while (
          state.yourBoard[coordinates.y][coordinates.x] === 1 ||
          state.yourBoard[coordinates.y][coordinates.x] === 'sink'
        ) {
          coordinates = getRandomIntCoordinate(max);
        }
        if (state.yourBoard[coordinates.y][coordinates.x] !== 'S1') {
          state.yourBoard[coordinates.y][coordinates.x] = 1;
          state.turn = 'Your';
          state.opponentsAttacks.push(
            `${ALPHABETS[coordinates.y]}${coordinates.x}`
          );
          state.turns++;
        } else {
          state.yourBoard[coordinates.y][coordinates.x] = 'sink';
          state.opponentsAttacks.push(
            `${ALPHABETS[coordinates.y]}${coordinates.x}`
          );
          state.phase = 'End';
        }
      }
    },
    newGame(state) {
      state.availableShips = AVAILABLE_SHIPS;
      state.computerShipsOnBoard = AVAILABLE_SHIPS;
      state.playerShipsOnBoard = AVAILABLE_SHIPS;
      state.phase = 'Setup';
      state.turn = 'Your';
      state.yourBoard = null;
      state.opponentsBoard = null;
      state.turns = 1;
      state.yourAttacks = [];
      state.opponentsAttacks = [];
    },
    withdrawal(state, action) {
      if (state.yourBoard) {
        state.yourBoard[action.payload.y][action.payload.x] = 0;
        state.availableShips++;
      }
    },
  },
});

export const {
  changePhase,
  addYourBoard,
  addOpponentsBoard,
  addShipToBoard,
  addRandomYourShips,
  addRandomEnemyShips,
  attack,
  randomAttack,
  newGame,
  withdrawal,
} = gameSlice.actions;

export const selectPhase = (state: RootState) => state.game.phase;
export const selectYourBoard = (state: RootState) => state.game.yourBoard;
export const selectOpponentsBoard = (state: RootState) =>
  state.game.opponentsBoard;
export const selectAvailableShips = (state: RootState) =>
  state.game.availableShips;
export const selectTurn = (state: RootState) => state.game.turn;
export const selectTurns = (state: RootState) => state.game.turns;
export const selectYourAttacks = (state: RootState) => state.game.yourAttacks;
export const selectOpponentsAttacks = (state: RootState) =>
  state.game.opponentsAttacks;

export default gameSlice.reducer;
