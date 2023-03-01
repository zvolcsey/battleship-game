import { FC } from 'react';
import styles from './AvailableShipsList.module.css';
import AvailableShip from './AvailableShip';
import type { IShip } from '../../app/types';

export const AvailableShipsList: FC<{ ships: IShip[] }> = (props) => {
  const { ships } = props;

  const availableShips = ships.map((ship) => (
    <AvailableShip key={ship.resourceId} shipData={ship} />
  ));

  return <ul className={styles.list}>{availableShips}</ul>;
};

export default AvailableShipsList;
