import deepcopy from "deepcopy";
import { v4 as uuidv4 } from "uuid";

const cardsList = [
  "chase.png",
  "marshall.jpg",
  "rocky.png",
  "rubble.png",
  "skye.png",
  "zuma.jpg",
  "rider.png",
  "everest.png",
];

  const totalCards = cardsList.length * 2;


export const shuffleArray = (array) => {
  return array.sort(() => 0.5 - Math.random());
};

export const generateCards = () => {
  const cards = shuffleArray(cardsList)
    .slice(0, totalCards / 2)
    .map((imageURL) => ({
      id: uuidv4(),
      imageURL: "../images/" + imageURL,
      isFlipped: false,
      canFlip: true,
    }))
    .flatMap((e) => [e, { ...deepcopy(e), id: uuidv4() }]);
  return shuffleArray(cards);
};

