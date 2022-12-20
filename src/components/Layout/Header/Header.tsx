import { FC } from 'react';

import styles from './Header.module.css';

const Header: FC<{ phase: 'Setup' | 'Attack' | 'End' }> = (props) => {
  const { phase } = props;

  return (
    <header className={styles.header}>
      <h1>BattleShip - {phase} Phase</h1>
    </header>
  );
};

export default Header;
