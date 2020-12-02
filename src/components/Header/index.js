import React from "react";
import { useSelector } from "react-redux";
import "./style.css";


function Header() {
  const { totalPoints, attempts } = useSelector((state) => state.deck);
  return (
    <div className="headerContainer">
      <div className="hitsCount">Jogadas: {attempts}</div>
      <div className="totalPoints">Pontuação: {totalPoints}</div>
    </div>
  );
}

export default Header;
