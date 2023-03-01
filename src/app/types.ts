export type BoardType = (number | string)[][];

export interface Coordinates {
  x: number;
  y: number;
}

export interface GameState {
  phase: 'Setup' | 'Attack' | 'End';
  turn: 'Your' | 'Computer';
  turns: number;
  yourBoard: BoardType | null;
  opponentsBoard: BoardType | null;
  availableShips: number;
  playerShipsOnBoard: number;
  computerShipsOnBoard: number;
  yourAttacks: string[];
  opponentsAttacks: string[];
}

export type DragStatus = 'idle' | 'start' | 'end';

export interface IAvailableShipsState {
  availableShips: IShip[];
  totalAvailableShips: number;
  dragStatus: DragStatus;
  selectedShip: IShip | null;
}

export interface IShip {
  type: string;
  resourceId: string;
  size: number;
}

export interface IAddShip {
  coordinates: Coordinates;
  type: string;
  shipSize: number;
}
