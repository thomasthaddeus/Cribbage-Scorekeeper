// src/components/Crib/Crib.tsx

import React, { useState } from "react";
import styles from "./Crib.module.css";
import { Card as CardType } from "card-games-typescript"; // Adjust based on your card handling setup

interface CribProps {
  onNextStep: () => void;
  onSetCrib: (cribCards: CardType[]) => void;
  playerHand: CardType[]; // Add this prop to accept the player's hand
}

const Crib: React.FC<CribProps> = ({ onNextStep, onSetCrib, playerHand }) => {
  const [selectedCards, setSelectedCards] = useState<CardType[]>([]);

  const toggleCardSelection = (card: CardType) => {
    const isSelected = selectedCards.find(
      (c) => c.rank === card.rank && c.suite === card.suite
    );
    if (isSelected) {
      setSelectedCards(
        selectedCards.filter(
          (c) => c.rank !== card.rank || c.suite !== card.suite
        )
      );
    } else if (selectedCards.length < 4) {
      setSelectedCards([...selectedCards, card]);
    }
  };

  const submitCrib = () => {
    if (selectedCards.length === 4) {
      onSetCrib(selectedCards);
      onNextStep();
    } else {
      alert('Please select exactly 4 cards for the crib.');
    }
  };

  // Use the player's hand for displaying card options
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Select Cards for the Crib</h2>
      <div className={styles.cardSelection}>
        {playerHand.map((card, index) => (
          <div key={index} className={`${styles.cardOption} ${selectedCards.includes(card) ? styles.selected : ''}`} onClick={() => toggleCardSelection(card)}>
            {card.rank} of {card.suite}
          </div>
        ))}
      </div>
      <button className={styles.submitButton} onClick={submitCrib}>Submit Crib</button>
    </div>
  );
};

export default Crib;
