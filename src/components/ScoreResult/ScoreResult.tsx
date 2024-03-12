// src/components/ScoreResult/ScoreResult.tsx

import React from 'react';
import styles from './ScoreResult.module.css';
import { Card as CardType } from 'card-games-typescript';

interface ScoreBreakdown {
  fifteens: number;
  pairs: number;
  runs: number;
  flush: number;
  nobs: number;
  total: number;
}

interface ScoreResultProps {
  hand: CardType[];
  crib: CardType[]; // Optional, depending on game state
  starter: CardType;
  scoreBreakdown: ScoreBreakdown;
  onReset: () => void; // Function to reset the game or proceed to the next hand/round
}

const ScoreResult: React.FC<ScoreResultProps> = ({ hand, crib, starter, scoreBreakdown, onReset }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Scoring Results</h2>
      <div className={styles.scoreDetails}>
        <div className={styles.detailItem}>Fifteens: {scoreBreakdown.fifteens} points</div>
        <div className={styles.detailItem}>Pairs: {scoreBreakdown.pairs} points</div>
        <div className={styles.detailItem}>Runs: {scoreBreakdown.runs} points</div>
        <div className={styles.detailItem}>Flush: {scoreBreakdown.flush} points</div>
        <div className={styles.detailItem}>Nobs: {scoreBreakdown.nobs} points</div>
        <div className={styles.detailItem}><strong>Total Score: {scoreBreakdown.total} points</strong></div>
      </div>
      <button className={styles.resetButton} onClick={onReset}>Reset Game</button>
    </div>
  );
};

export default ScoreResult;
