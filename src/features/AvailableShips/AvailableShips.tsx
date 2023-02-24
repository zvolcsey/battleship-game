import { FC, useState } from 'react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import AvailableShipsList from './AvailableShipsList';
import styles from './AvailableShips.module.css';
import { Button } from '@chakra-ui/react';
import { useAppSelector } from '../../app/hooks';
import {
  selectAvailableShips,
  selectTotalAvailableShips,
} from './AvailableShipsSlice';

const AvailableShips: FC<{}> = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const availableShips = useAppSelector(selectAvailableShips);
  const totalAvailableShips = useAppSelector(selectTotalAvailableShips);

  const handleToggle = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className={styles.container}>
      <p>Development</p>
      <Button colorScheme="blue" className={styles.btn} onClick={handleToggle}>
        <div className={styles['remaining-ships']}>
          <h2 className={styles.title}>Ships in the dock:</h2>
          <span>{totalAvailableShips}</span>
        </div>
        <ChevronDownIcon
          className={`${styles.icon} ${isOpen ? styles['rotate-180'] : ''}`}
        />
      </Button>
      {isOpen && <AvailableShipsList ships={availableShips} />}
    </div>
  );
};

export default AvailableShips;
