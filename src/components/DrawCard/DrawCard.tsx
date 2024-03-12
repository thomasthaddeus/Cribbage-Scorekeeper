// src/components/DrawCard/DrawCard.tsx

import React, { useState } from 'react';
import styles from './DrawCard.module.css';
import { Card as CardType, Deck } from 'card-games-typescript'; // Ensure the library is installed and imported correctly

interface DrawCardProps {
  onNextStep: () => void;
  onSetStarter: (card: CardType) => void;
}

const DrawCard: React.FC<DrawCardProps> = ({ onNextStep, onSetStarter }) => {
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
  const [deck] = useState<Deck>(new Deck()); // Assuming deck is initialized here; adjust based on actual app structure

  // Function to handle selecting a card as the starter
  const selectStarter = (card: CardType) => {
    setSelectedCard(card);
  };

  // Function to handle submitting the selected starter card
  const submitStarter = () => {
    if (selectedCard) {
      onSetStarter(selectedCard);
      onNextStep();
    } else {
      alert('Please select a starter card.');
    }
  };

  // Assuming the deck is shuffled and ready to use
  // Display only a subset of the deck for the starter card selection for demonstration purposes
  const displayCards = deck.cards.slice(0, 5); // Adjust based on your game logic

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Select the Draw Card</h2>
      <div className={styles.cardSelection}>
        {displayCards.map((card, index) => (
          <div key={index} onClick={() => selectStarter(card)} className={`${styles.cardOption} ${selectedCard === card ? styles.selected : ''}`}>
            {card.rank} of {card.suit}
          </div>
        ))}
      </div>
      <button onClick={submitStarter} className={styles.submitButton}>Submit Draw Card</button>
    </div>
  );
};

export default DrawCard;
