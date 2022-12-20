import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addYourBoard,
  addOpponentsBoard,
  selectOpponentsBoard,
  selectPhase,
  selectYourBoard,
  addRandomEnemyShips,
  selectTurn,
  randomAttack,
  newGame,
  selectTurns,
  selectYourAttacks,
  selectOpponentsAttacks,
} from './features/Game/GameSlice';
import Board from './components/Board/Board';
import styles from './App.module.css';
import { createBoard } from './utils/utils';
import Header from './components/Layout/Header/Header';
import AttackPhaseMessages from './components/AttackPhaseMessages/AttackPhaseMessages';
import GameOver from './components/GameOver/GameOver';
import { BOARD_COLUMNS, BOARD_ROWS } from './app/constants';

const App: FC<{}> = () => {
  const phase = useSelector(selectPhase);
  const yourBoard = useSelector(selectYourBoard);
  const enemyBoard = useSelector(selectOpponentsBoard);
  const turn = useSelector(selectTurn);
  const turns = useSelector(selectTurns);
  const yourAttacks = useSelector(selectYourAttacks);
  const opponentsAttacks = useSelector(selectOpponentsAttacks);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!yourBoard && !enemyBoard) {
      const newYourBoard = createBoard(BOARD_COLUMNS, BOARD_ROWS);
      const newEnemyBoard = createBoard(BOARD_COLUMNS, BOARD_ROWS);
      dispatch(addYourBoard(newYourBoard));
      dispatch(addOpponentsBoard(newEnemyBoard));
      dispatch(addRandomEnemyShips());
    }
  }, [yourBoard, enemyBoard]);

  useEffect(() => {
    if (turn === 'Computer') {
      setTimeout(() => {
        dispatch(randomAttack());
      }, 3000);
    }
  }, [turn]);

  const newGameHandler = () => {
    dispatch(newGame());
  };

  return (
    <>
      <Header phase={phase} />
      <main className={styles.main}>
        {phase === 'End' && (
          <GameOver turn={turn} turns={turns} onNewGame={newGameHandler} />
        )}
        {phase !== 'Setup' && (
          <AttackPhaseMessages
            phase={phase}
            turn={turn}
            turns={turns}
            yourAttacks={yourAttacks}
            opponentsAttacks={opponentsAttacks}
          />
        )}
        <div className={styles.container}>
          <Board name="Your Board" board={yourBoard} />
          <Board name="Computer's Board" board={enemyBoard} />
        </div>
      </main>
    </>
  );
};

export default App;
