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

export interface IAvailableShips {
  availableShips: IShips[];
  totalAvailableShips: number;
}

export interface IShips {
  type: string;
  resourceId: string;
}
