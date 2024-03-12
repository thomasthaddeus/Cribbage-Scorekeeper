import React, { useState, useEffect } from 'react';
import { Card, DeckOfCards } from 'card-games-typescript'; // Corrected import
import HomePage from '../HomePage/HomePage';
import DrawCard from '../DrawCard/DrawCard';
import PlayerHand from '../PlayerHand/PlayerHand';
import Crib from '../Crib/Crib';
import ScoreResult from '../ScoreResult/ScoreResult';
import { calculateHandScore } from '../../utils/scoringLogic';

const App: React.FC = () => {
    const [step, setStep] = useState<number>(0);
    const [deck, setDeck] = useState<DeckOfCards>(new DeckOfCards()); // Corrected usage
    const [selectedStarter, setSelectedStarter] = useState<Card | null>(null);
    const [playerHand, setPlayerHand] = useState<Card[]>([]);
    const [crib, setCrib] = useState<Card[]>([]);

    useEffect(() => {
        deck.shuffleDeck(); // Correct method call
        setPlayerHand(deck.drawCard(6)); // Adjusted method call, assuming drawCard can draw multiple
    }, [deck]);

    const nextStep = () => setStep((prevStep) => prevStep + 1);

    const resetGame = () => {
        const newDeck = new Deck();
        newDeck.shuffle();
        setDeck(newDeck);
        setStep(0);
        setSelectedStarter(null);
        setPlayerHand([]);
        setCrib([]);
    };

    const handleSetStarter = (card: Deck.Card) => {
        setSelectedStarter(card);
        nextStep();
    };

    // Update handlers to manage player's hand, crib, and score calculation as necessary
    // This is just a structural example; you'll need to integrate these functionalities based on your game logic

    const renderStep = () => {
        switch (step) {
            case 0:
                return <HomePage onNextStep={nextStep} />;
            case 1:
                return <DrawCard deck={deck} onSetStarter={handleSetStarter} onNextStep={nextStep} />;
            case 2:
                return <PlayerHand hand={playerHand} onSetHand={setPlayerHand} onNextStep={nextStep} />;
            case 3:
                return <Crib hand={playerHand} onSetCrib={setCrib} onNextStep={nextStep} />;
            case 4:
                const score = selectedStarter ? calculateHandScore({ cards: playerHand, starter: selectedStarter, crib }, false) : 0;
                return <ScoreResult hand={playerHand} crib={crib} starter={selectedStarter} score={score} onReset={resetGame} />;
            default:
                return <div>Unknown step</div>;
        }
    };

    return <div className="App">{renderStep()}</div>;
};

export default App;
