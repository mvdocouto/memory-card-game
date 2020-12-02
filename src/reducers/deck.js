import { generateCards } from "../utils/deck";

const INITIAL_STATE = {
  deck: generateCards(),
  totalPoints: 0,
  attempts: 0,
  loading: false,
  error: false,
};

export default function deck(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "ADD_ATTEMPTS":
      return { ...state, attempts: state.attempts + 1 };
    case "ADD_POINTS":
      return { ...state, totalPoints: state.totalPoints + 1 };
    default:
      return state;
  }
}
