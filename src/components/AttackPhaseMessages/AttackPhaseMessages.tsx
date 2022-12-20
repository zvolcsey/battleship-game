import { FC } from 'react';
import Attacks from './Attacks/Attacks';

import styles from './AttackPhaseMessages.module.css';

const AttackPhaseMessages: FC<{
  phase: 'Setup' | 'Attack' | 'End';
  turn: 'Your' | 'Computer';
  turns: number;
  yourAttacks: string[];
  opponentsAttacks: string[];
}> = (props) => {
  const { phase, turn, turns, yourAttacks, opponentsAttacks } = props;

  return (
    <div className={styles.container}>
      {phase === 'Attack' && (
        <>
          <h2 className={styles.turn}>{`${turns}. Turn`}</h2>
          {phase === 'Attack' && (
            <p>{`${turn === 'Your' ? 'Your turn!' : "Computer's turn!"}`}</p>
          )}
          <p className={styles['turn-messages']}>
            {`${
              turn === 'Your'
                ? `Please choose a cell in the computer's board!`
                : `Waiting for the Computer...`
            }
					`}
          </p>
        </>
      )}
      <Attacks yourAttacks={yourAttacks} opponentsAttacks={opponentsAttacks} />
    </div>
  );
};

export default AttackPhaseMessages;
