import { FC } from 'react';
import { Button } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectAvailableShips,
  changePhase,
  addRandomYourShips,
} from '../../../features/Game/GameSlice';
import styles from './SetupAction.module.css';

const SetupAction: FC<{}> = () => {
  const availableShips = useSelector(selectAvailableShips);

  const dispatch = useDispatch();

  const goToAttackPhaseHandler = () => {
    dispatch(changePhase('Attack'));
  };

  const addRandomYourShipsHandler = () => {
    if (availableShips > 0) {
      dispatch(addRandomYourShips());
    }
  };

  return (
    <div className={styles.container}>
      <Button
        colorScheme="blue"
        className={styles.btn}
        onClick={goToAttackPhaseHandler}
        disabled={availableShips > 0 ? true : false}
      >
        Finish Setup
      </Button>
      <Button
        colorScheme="blue"
        className={styles.btn}
        variant="outline"
        onClick={addRandomYourShipsHandler}
      >
        Random placement
      </Button>
    </div>
  );
};

export default SetupAction;
