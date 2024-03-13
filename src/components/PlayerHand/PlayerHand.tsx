import React, { useState, useEffect } from 'react';
import styles from './PlayerHand.module.css';
import { Card, DeckOfCards } from 'card-games-typescript'; // Ensure proper import

interface PlayerHandProps {
  onNextStep: () => void;
  onSetHand: (selectedHand: Card[]) => void;
}

const PlayerHand: React.FC<PlayerHandProps> = ({ onNextStep, onSetHand }) => {
  const [deck] = useState(new DeckOfCards()); // Initialize the deck
  const [playerHand, setPlayerHand] = useState<Card[]>([]); // State to hold player's hand

  useEffect(() => {
    deck.shuffleDeck(); // Shuffle the deck
    drawInitialHand(); // Draw initial hand for the player
  }, [deck]);

  // Function to draw initial hand for the player
  const drawInitialHand = () => {
    const drawnCards: Card[] = [];
    for (let i = 0; i < 6; i++) { // Assuming 6 cards for the hand
      const card = deck.drawCard(); // Draw a card from the deck
      if (card) drawnCards.push(card);
    }
    setPlayerHand(drawnCards); // Update state with drawn cards
  };

  // Function to select a card
  const selectCard = (card: Card) => {
    const newSelectedCards = playerHand.filter(selectedCard => selectedCard !== card);
    if (newSelectedCards.length < playerHand.length) {
      // Card was deselected
      setPlayerHand([...newSelectedCards]);
    } else if (playerHand.length < 4) {
      // New card selected and less than 4 cards are currently selected
      setPlayerHand([...playerHand, card]);
    }
    // Update game state or UI as needed
  };

  // Function to submit the selected hand
  const submitHand = () => {
    if (playerHand.length === 4) { // Verify exactly 4 cards are selected
      onSetHand(playerHand);
      onNextStep();
    } else {
      alert('Please select exactly 4 cards.');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Select Your Hand</h2>
      <div className={styles.handSelection}>
        {playerHand.map((card, index) => (
          <div key={index} onClick={() => selectCard(card)} className={styles.cardOption}>
            {card.rank} of {card.suite}
          </div>
        ))}
      </div>
      <button onClick={submitHand} className={styles.submitButton}>Submit Hand</button>
    </div>
  );
};

export default PlayerHand;
