import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../app/hooks';
import {
  attack,
  selectAvailableShips,
  selectPhase,
  selectTurn,
  selectYourBoard,
  withdrawal,
} from '../../../features/Game/GameSlice';
import { addShipToBoard } from '../../../features/Game/GameSlice';
import styles from './Cell.module.css';

const Cell: FC<{
  board: 'Your Board' | "Computer's Board";
  data: number | string;
  x: number;
  y: number;
}> = (props) => {
  const { board, data, x, y } = props;

  const phase = useSelector(selectPhase);
  const availableShips = useSelector(selectAvailableShips);
  const turn = useSelector(selectTurn);
  const yourBoard = useSelector(selectYourBoard);

  const dispatch = useAppDispatch();

  let content: JSX.Element | null = null;

  if (data === 1 && board === 'Your Board') {
    content = <div className={styles.opponentsMissileAttack}></div>;
  } else if (data === 'sink' && board === 'Your Board') {
    content = (
      <div className={styles.sink}>
        <div className={styles.ship}>
          <div className={styles.opponentsMissileAttack}></div>
        </div>
      </div>
    );
  } else if (data === 'sink' && board === "Computer's Board") {
    content = (
      <div className={styles.sink}>
        <div className={styles.ship}>
          <div className={styles.yourMissileAttack}></div>
        </div>
      </div>
    );
  } else if (typeof data === 'string' && board === 'Your Board') {
    content = <div className={styles.ship}></div>;
  } else if (
    phase === 'End' &&
    typeof data === 'string' &&
    board === "Computer's Board"
  ) {
    content = <div className={styles.ship}></div>;
  } else if (data === 1 && board === "Computer's Board") {
    content = <div className={styles.yourMissileAttack}></div>;
  }

  const addShipToBoardHandler = () => {
    if (availableShips > 0 && board === 'Your Board') {
      dispatch(addShipToBoard({ x, y }));
    }
    if (yourBoard && yourBoard[y][x] === 'S1') {
      dispatch(withdrawal({ x, y }));
    }
  };

  const attackHandler = () => {
    if (phase === 'Attack' && turn === 'Your') {
      dispatch(attack({ x, y }));
    }
  };

  return (
    <td
      className={`${styles.cell} ${styles.water}`}
      onClick={board === 'Your Board' ? addShipToBoardHandler : attackHandler}
    >
      {content}
    </td>
  );
};

export default Cell;
