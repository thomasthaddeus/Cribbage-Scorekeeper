import React, { useState, useEffect } from 'react';
import { Card, DeckOfCards } from 'card-games-typescript';
import HomePage from '../HomePage/HomePage';
import DrawCard from '../DrawCard/DrawCard';
import PlayerHand from '../PlayerHand/PlayerHand';
import Crib from '../Crib/Crib';
import ScoreResult from '../ScoreResult/ScoreResult';
import { calculateHandScore } from '../../utils/scoringLogic';

export default function App() {
    const [step, setStep] = useState(0);
    const [deck, setDeck] = useState(new DeckOfCards());
    const [selectedStarter, setSelectedStarter] = useState(null);
    const [playerHand, setPlayerHand] = useState([]);
    const [cribCards, setCribCards] = useState([]);

    useEffect(() => {
        deck.shuffleDeck();
        // This assumes `drawCard` method exists and can draw multiple cards, adjust according to actual API
        setPlayerHand(deck.drawCard(6));
    }, [deck]);

    const onNextStep = () => setStep(step + 1);
    const onReset = () => {/* Reset game logic here */};

    // Define how to set the starter card, player hand, and crib, based on your game's rules
    // This will require implementing onSetStarter, onSetHand, and onSetCrib functions and passing them to the relevant components

    switch(step) {
        case 0:
            return <HomePage onNextStep={onNextStep} />;
        case 1:
            // Assuming DrawCard component is updated to accept a Card[] for drawing the starter card
            return <DrawCard onNextStep={onNextStep} onSetStarter={setSelectedStarter} cards={deck.cards} />;
        case 2:
            return <PlayerHand onNextStep={onNextStep} onSetHand={setPlayerHand} cards={playerHand} />;
        case 3:
            return <Crib onNextStep={onNextStep} onSetCrib={setCribCards} playerHand={playerHand} />;
        case 4:
            const score = calculateHandScore({cards: playerHand, starter: selectedStarter}, false); // Adjust as per your scoring logic
            return <ScoreResult hand={playerHand} crib={cribCards} starter={selectedStarter} scoreBreakdown={/* scoring breakdown */} onReset={onReset} />;
        default:
            return <div>Unknown step</div>;
    }
}
