import { FC } from 'react';
import styles from './AvailableShipsList.module.css';
import AvailableShip from './AvailableShip';
import type { IShips } from '../../app/types';

export const AvailableShipsList: FC<{ ships: IShips[] }> = (props) => {
  const { ships } = props;

  const availableShips = ships.map(({ type, resourceId }) => (
    <AvailableShip key={resourceId} type={type} />
  ));

  return <ul className={styles.list}>{availableShips}</ul>;
};

export default AvailableShipsList;
