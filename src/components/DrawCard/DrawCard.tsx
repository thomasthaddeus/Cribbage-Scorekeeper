// src/components/DrawCard/DrawCard.tsx

import React, { useState } from 'react';
import styles from './DrawCard.module.css';

interface Card {
  rank: string;
  suit: string;
}

interface DrawCardProps {
  onNextStep: () => void;
  onSetStarter: (card: Card) => void;
}

const DrawCard: React.FC<DrawCardProps> = ({ onNextStep, onSetStarter }) => {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  // Function for selecting a starter card
  // Note: In a fully implemented application, you might fetch available cards from the application's state (e.g., using Redux or Context API).
  const selectStarter = (card: Card) => {
    setSelectedCard(card);
  };

  // Function for submitting the selected starter card
  // Note: The selected card is passed to the parent component to update the game's state.
  // Ensure onSetStarter correctly updates the global game state and that onNextStep navigates to the next phase of the game.
  const submitStarter = () => {
    if (selectedCard) {
      onSetStarter(selectedCard);
      onNextStep();
    } else {
      alert('Please select a starter card.'); // Consider replacing this with a more user-friendly error handling method.
    }
  };

  // Rendering card options
  // Note: For a dynamic card selection, you should replace the hardcoded card with a list derived from the game's state.
  // This may involve fetching the available cards from a backend or a centralized state manager (like Redux) to ensure they are not already drawn.
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Select the Draw Card</h2>
      <div className={styles.cardSelection}>
        {/* Dynamic rendering of card options */}
        {/* Note: Implement a mechanism to dynamically render card options based on the game's current state.
        This might involve mapping over an array of card objects. */}
        <div onClick={() => selectStarter({ rank: 'King', suit: 'Spades' })} className={styles.cardOption}>King of Spades</div>
        {/* Repeat for other cards, ideally using .map() over an array of Card objects. */}
      </div>
      <button onClick={submitStarter} className={styles.submitButton}>Submit Draw Card</button>
    </div>
  );
};

export default DrawCard;
