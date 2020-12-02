import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addAttempts, addPoints } from "../../actions/deck"
import Card from "../Card";
import "./style.css";

const GridCard = () => {
  const { deck } = useSelector((state) => state.deck);
  const dispatch = useDispatch();
  
  const [cards, setCards] = useState(deck);
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

  const clearSelectedCards = () => {
    setFirstCard(null);
    setSecondCard(null);
  };

  useEffect(() => {
    const onSuccess = () => {
      setCardCanFlip(firstCard.id, false);
      setCardCanFlip(secondCard.id, false);
      setCardIsFlipped(firstCard.id, true);
      setCardIsFlipped(secondCard.id, true);

      dispatch(addAttempts());
      dispatch(addPoints());
      clearSelectedCards();
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

      dispatch(addAttempts());
      clearSelectedCards();
    };

    if (!firstCard || !secondCard) return;
    firstCard.imageURL === secondCard.imageURL ? onSuccess() : onFailure();
  }, [firstCard, secondCard, dispatch]);

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
