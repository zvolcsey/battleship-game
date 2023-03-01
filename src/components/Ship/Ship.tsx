import { FC } from 'react';
import styles from './Ship.module.css';
import { useAppDispatch } from '../../app/hooks';
import {
  changeDragStatus,
  selectShip,
} from '../../features/AvailableShips/AvailableShipsSlice';
import { IShip } from '../../app/types';

const Ship: FC<{ shipData: IShip; draggable: boolean }> = (props) => {
  const { shipData, draggable } = props;
  const { type } = shipData;

  const dispatch = useAppDispatch();

  let shipStyles: string = '';

  switch (type) {
    case 'Submarine':
      shipStyles = styles.submarine;
      break;
    case 'Destroyer':
      shipStyles = styles.destroyer;
      break;
    case 'Battleship':
      shipStyles = styles.battleship;
      break;
    case 'Carrier':
      shipStyles = styles.carrier;
      break;
    default:
      shipStyles = styles['patrol-boat'];
      break;
  }

  const handleDragStart = (e: React.DragEvent<HTMLElement>) => {
    e.stopPropagation();
    dispatch(changeDragStatus('start'));
    dispatch(selectShip(shipData));
  };

  const handleDragEnd = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(changeDragStatus('end'));
  };

  return (
    <div
      className={`${styles.ship} ${shipStyles}`}
      draggable={draggable}
      onDragStart={(e) => handleDragStart(e)}
      onDragEnd={(e) => handleDragEnd(e)}
    >
      <span className={styles.size}>size: {shipData.size}</span>
    </div>
  );
};

export default Ship;
