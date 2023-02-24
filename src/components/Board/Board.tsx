import { FC } from 'react';
import { ALPHABETS, BOARD_SIZE, COLUMNS } from '../../app/constants';
import Cell from './Cell/Cell';
import { useSelector } from 'react-redux';
import {
  selectAvailableShips,
  selectPhase,
} from '../../features/Game/GameSlice';
import SetupAction from './SetupAction/SetupActions';
import styles from './Board.module.css';

import type { BoardType } from '../../app/types';
import AvailableShips from '../../features/AvailableShips/AvailableShips';

const Board: FC<{
  name: 'Your Board' | "Computer's Board";
  board: BoardType | null;
}> = (props) => {
  const { name, board } = props;

  const phase = useSelector(selectPhase);
  const availableShips = useSelector(selectAvailableShips);

  let tableFooter = null;
  if (phase === 'Setup' && name === 'Your Board') {
    tableFooter = (
      <tfoot>
        <tr>
          <td className={styles['footer-data']} colSpan={BOARD_SIZE / 2 + 1}>
            Ships in the dock:
          </td>
          <td className={styles['footer-data']} colSpan={BOARD_SIZE / 2}>
            {availableShips}
          </td>
        </tr>
      </tfoot>
    );
  }

  if (board) {
    return (
      <div className={styles.container}>
        <table className={styles.board}>
          <thead>
            <tr>
              <th colSpan={BOARD_SIZE + 1}>{name}</th>
            </tr>
            <tr>
              {COLUMNS.map((column: string, idx) => (
                <th className="column-header-cell" key={idx}>
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {board.map((row, idx) => (
              <tr key={idx} className={styles['tbody-data-row']}>
                <td className={styles['row-header-cell']}>
                  {ALPHABETS[board.indexOf(row)]}
                </td>
                {row.map((data, idx) => (
                  <Cell
                    key={idx}
                    board={name}
                    data={data}
                    x={idx}
                    y={board.indexOf(row)}
                  />
                ))}
              </tr>
            ))}
          </tbody>
          {tableFooter}
        </table>
        {phase === 'Setup' && name === 'Your Board' && <AvailableShips />}
        {phase === 'Setup' && name === 'Your Board' && <SetupAction />}
      </div>
    );
  } else {
    return <p>No board!</p>;
  }
};

export default Board;
