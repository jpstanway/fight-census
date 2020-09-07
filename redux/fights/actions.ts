import { Fight } from "../../types/types";

export const fightActionTypes = {
  INITIALIZE_FIGHTS: "INITIALIZE_FIGHTS",
};

export const initializeFights = (fights: Fight[]) => {
  return {
    type: fightActionTypes.INITIALIZE_FIGHTS,
    payload: fights,
  };
};
