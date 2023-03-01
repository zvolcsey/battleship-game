import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import {
  attack,
  selectPhase,
  selectTurn,
  selectYourBoard,
  withdrawal,
} from '../../../features/Game/GameSlice';
import { addShipToBoard } from '../../../features/Game/GameSlice';
import styles from './Cell.module.css';
import {
  addShip,
  changeDragStatus,
  decreaseShipsCount,
  increaseShipsCount,
  removeShip,
  selectDragStatus,
  selectSelectedShip,
} from '../../../features/AvailableShips/AvailableShipsSlice';
import {
  checkOverflowFromBoard,
  checkShipsOverlap,
} from '../../../utils/utils';

const Cell: FC<{
  boardName: 'Your Board' | "Computer's Board";
  data: number | string;
  x: number;
  y: number;
}> = (props) => {
  const { boardName, data, x, y } = props;

  const phase = useSelector(selectPhase);
  const turn = useSelector(selectTurn);
  const yourBoard = useSelector(selectYourBoard);
  const dragStatus = useAppSelector(selectDragStatus);
  const selectedShip = useAppSelector(selectSelectedShip);

  const [status, setStatus] = useState<'idle' | 'selected'>('idle');
  const [statusStyles, setStatusStyles] = useState<string>('');

  useEffect(() => {
    if (dragStatus === 'start' && boardName === 'Your Board') {
      setStatus('idle');
      setStatusStyles('');
    }
  }, [dragStatus]);

  const dispatch = useAppDispatch();

  let content: JSX.Element | null = null;

  if (data === 1 && boardName === 'Your Board') {
    content = <div className={styles.opponentsMissileAttack}></div>;
  } else if (data === 'sink' && boardName === 'Your Board') {
    content = (
      <div className={styles.sink}>
        <div className={styles.ship}>
          <div className={styles.opponentsMissileAttack}></div>
        </div>
      </div>
    );
  } else if (data === 'sink' && boardName === "Computer's Board") {
    content = (
      <div className={styles.sink}>
        <div className={styles.ship}>
          <div className={styles.yourMissileAttack}></div>
        </div>
      </div>
    );
  } else if (typeof data === 'string' && boardName === 'Your Board') {
    content = <div className={styles.ship}>{data}</div>;
  } else if (
    phase === 'End' &&
    typeof data === 'string' &&
    boardName === "Computer's Board"
  ) {
    content = <div className={styles.ship}></div>;
  } else if (data === 1 && boardName === "Computer's Board") {
    content = <div className={styles.yourMissileAttack}></div>;
  }

  const addShipToBoardHandler = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (boardName === 'Your Board' && selectedShip && yourBoard) {
      const isOverlap = checkShipsOverlap(
        { x, y },
        yourBoard,
        selectedShip.size
      );
      const isOverflow = checkOverflowFromBoard(
        { x, y },
        yourBoard,
        selectedShip.size
      );

      if (!isOverlap && !isOverflow) {
        dispatch(
          addShipToBoard({
            coordinates: { x, y },
            type: selectedShip.type,
            shipSize: selectedShip?.size!,
          })
        );
        dispatch(decreaseShipsCount());
        dispatch(removeShip(selectedShip?.resourceId!));
        dispatch(changeDragStatus('end'));
        setStatus('idle');
        setStatusStyles('');
      }
    }
  };

  const removeShipFromBoard = () => {
    if (boardName === 'Your Board' && !selectedShip && yourBoard) {
      dispatch(withdrawal({ x, y }));
      dispatch(increaseShipsCount());
      dispatch(addShip(yourBoard));
    }
  };

  const attackHandler = () => {
    if (phase === 'Attack' && turn === 'Your') {
      dispatch(attack({ x, y }));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setStatus('selected');
    setStatusStyles(styles.selected);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setStatus('idle');
    setStatusStyles('');
  };

  return (
    <td
      className={`${styles.cell} ${styles.water} ${statusStyles}`}
      onClick={removeShipFromBoard}
      onDragEnter={(e) => console.log('onDragEnter')}
      onDragLeave={(e) => handleDragLeave(e)}
      onDragOver={(e) => handleDragOver(e)}
      onDrop={(e) => addShipToBoardHandler(e)}
    >
      {content}
    </td>
  );
};

export default Cell;
