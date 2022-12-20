import { FC } from 'react';
import { Button } from '@chakra-ui/react';

import styles from './GameOver.module.css';

const GameOver: FC<{
  turn: 'Your' | 'Computer';
  turns: number;
  onNewGame: () => void;
}> = (props) => {
  const { turn, turns, onNewGame } = props;

  return (
    <div className={styles.container}>
      <div>
        <p className="phase-container">
          {turn === 'Your'
            ? 'You won the game! :)'
            : 'The computer won the game. :('}
        </p>
        <p>{`The game lasted for ${turns} ${turns > 1 ? 'turns' : 'turn'}.`}</p>
      </div>
      <Button colorScheme="blue" onClick={onNewGame}>
        New Game
      </Button>
    </div>
  );
};

export default GameOver;
