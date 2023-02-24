import { FC } from 'react';
import styles from './Ship.module.css';

const Ship: FC<{ type: string }> = (props) => {
  const { type } = props;

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

  return <div className={`${styles.ship} ${shipStyles}`}></div>;
};

export default Ship;
