import React, { useState, useEffect } from "react";
import { generateCards } from "../../utils/deck";
import Card from "../Card"
import "./style.css";

const cardsList = [
  "macaco.png",
  "porquinho.png",
  "tartaruga.png",
  "tubarao.png",
  "canguru.png",
  "crocodilo.png",
];

const GridCard = () => {
  const totalCards = cardsList.length * 2;
  const [cards, setCards] = useState(generateCards(totalCards, cardsList));
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);

  const setCardIsFlipped = (cardID, isFlipped) => {
    setCards((prevState) =>
      prevState.map((card) => {
        if (card.id !== cardID) return card;
        return { ...card, isFlipped };
      })
    );
  };

  const setCardCanFlip = (cardID, canFlip) => {
    setCards((prevState) =>
      prevState.map((card) => {
        if (card.id !== cardID) return card;
        return { ...card, canFlip };
      })
    );
  };

  function resetFirstAndSecondCards() {
    setFirstCard(null);
    setSecondCard(null);
  }


  useEffect(() => {
    const onSuccess = () => {
      setCardCanFlip(firstCard.id, false);
      setCardCanFlip(secondCard.id, false);
      setCardIsFlipped(firstCard.id, true);
      setCardIsFlipped(secondCard.id, true);
      resetFirstAndSecondCards();
    };

    const onFailure = () => {
      const firstCardID = firstCard.id;
      const secondCardID = secondCard.id;

      setTimeout(() => {
        setCardIsFlipped(firstCardID, false);
      }, 1500);
      setTimeout(() => {
        setCardIsFlipped(secondCardID, false);
      }, 1700);

      resetFirstAndSecondCards();
    };

    if (!firstCard || !secondCard) return;
    firstCard.imageURL === secondCard.imageURL ? onSuccess() : onFailure();
  }, [firstCard, secondCard]);

  const onCardClick = (card) => {
    if (!card.canFlip) return;

    if (
      (firstCard && card.id === firstCard.id) ||
      (secondCard && card.id === secondCard.id)
    ) {
      return;
    }

    setCardIsFlipped(card.id, true);
    firstCard ? setSecondCard(card) : setFirstCard(card);
  };

  return (
    <div className="cards-container">
      {cards.map((card) => (
        <Card onClick={() => onCardClick(card)} key={card.id} {...card} />
      ))}
    </div>
  );
};

export default GridCard;
