import { FC } from 'react';
import styles from './AvailableShip.module.css';
import Ship from '../../components/Ship/Ship';
import { IShip } from '../../app/types';

export const AvailableShip: FC<{ shipData: IShip }> = (props) => {
  const { shipData } = props;
  return (
    <li className={styles.item}>
      <Ship shipData={shipData} draggable />
    </li>
  );
};

export default AvailableShip;
