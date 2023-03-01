import { FC, useState } from 'react';
import { ChevronDownIcon, InfoOutlineIcon } from '@chakra-ui/icons';
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
      <div className={styles['info-box']}>
        <InfoOutlineIcon />
        <p className={styles.hint}>
          Please drag the ships and place them on your board!
        </p>
      </div>
      <Button colorScheme="blue" className={styles.btn} onClick={handleToggle}>
        <div className={styles['remaining-ships']}>
          <h2 className={styles.title}>Ships in the dock:</h2>
          <span>{totalAvailableShips}</span>
        </div>
        <ChevronDownIcon
          className={`${styles.icon} ${isOpen ? styles['rotate-180'] : ''}`}
        />
      </Button>
      {isOpen && availableShips.length > 0 && (
        <AvailableShipsList ships={availableShips} />
      )}
      {isOpen && availableShips.length === 0 && (
        <p className={styles.message}>
          All ships have been sent on the mission.
        </p>
      )}
    </div>
  );
};

export default AvailableShips;
