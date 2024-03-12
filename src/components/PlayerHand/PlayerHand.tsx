// src/components/PlayerHand/PlayerHand.tsx

import React, { useState, useEffect } from 'react';
import styles from './PlayerHand.module.css';
import { Deck } from 'card-games-typescript';

interface PlayerHandProps {
  onNextStep: () => void;
  onSetHand: (selectedHand: Deck.Card[]) => void;
}

const PlayerHand: React.FC<PlayerHandProps> = ({ onNextStep, onSetHand }) => {
  const [deck, setDeck] = useState<Deck>(new Deck());
  const [selectedCards, setSelectedCards] = useState<Deck.Card[]>([]);

  useEffect(() => {
    // Initialize or reshuffle the deck as needed
    deck.shuffle();
  }, [deck]);

  // Function to select a card
  const selectCard = (card: Deck.Card) => {
    if (selectedCards.length < 4 && !selectedCards.includes(card)) {
      setSelectedCards([...selectedCards, card]);
    }
  };

  // Function to submit the selected hand
  const submitHand = () => {
    if (selectedCards.length === 4) {
      onSetHand(selectedCards);
      onNextStep();
    } else {
      alert('Please select exactly 4 cards.');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Select Your Hand</h2>
      <div className={styles.handSelection}>
        {deck.cards.slice(0, 12).map((card, index) => (
          <div key={index} onClick={() => selectCard(card)} className={styles.cardOption}>
            {card.rank} of {card.suit}
          </div>
        ))}
      </div>
      <button onClick={submitHand} className={styles.submitButton}>Submit Hand</button>
    </div>
  );
};

export default PlayerHand;
