import { FC } from 'react';

import styles from './Attacks.module.css';

const Attacks: FC<{ yourAttacks: string[]; opponentsAttacks: string[] }> = (
  props
) => {
  const { yourAttacks, opponentsAttacks } = props;

  return (
    <div className={styles['attacks-container']}>
      <p className={styles.moves}>{`Your attacks: ${
        yourAttacks.length === 0 ? 'No Attacks' : yourAttacks
      }`}</p>
      <p className={styles.moves}>{`Computer's attacks: ${
        opponentsAttacks.length === 0 ? 'No Attacks' : opponentsAttacks
      }`}</p>
    </div>
  );
};

export default Attacks;
