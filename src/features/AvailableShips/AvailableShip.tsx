import { FC } from 'react';
import styles from './AvailableShip.module.css';
import Ship from '../../components/Ship/Ship';

export const AvailableShip: FC<{ type: string }> = (props) => {
  const { type } = props;
  return (
    <li className={styles.item}>
      <Ship type={type} />
    </li>
  );
};

export default AvailableShip;
