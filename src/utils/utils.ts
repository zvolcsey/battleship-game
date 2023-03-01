import type { Coordinates, BoardType, IShip } from '../app/types';

export const createBoard = (x: number, y: number): BoardType => {
  //https://www.pluralsight.com/guides/display-multidimensional-array-data-in-react
  return new Array(y).fill(0).map((row) => new Array(x).fill(0));
};

export const getRandomIntCoordinate = (max: number): Coordinates => {
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values_inclusive    const newMaxX = Math.floor(maxX);
  const roundedMax = Math.floor(max);

  const x = Math.floor(Math.random() * (roundedMax + 1));
  const y = Math.floor(Math.random() * (roundedMax + 1));

  return { x, y };
};

export const checkShipsOverlap = (
  coordinates: Coordinates,
  board: BoardType,
  shipSize: number
) => {
  const { x, y } = coordinates;
  for (let i = 0; i < shipSize; i++) {
    if (typeof board[y][x + i] === 'string') {
      return true;
    }
  }
  return false;
};

export const checkOverflowFromBoard = (
  { x, y }: Coordinates,
  board: BoardType,
  shipSize: number
) => {
  if (x + shipSize > board[0].length) {
    return true;
  }
  return false;
};
