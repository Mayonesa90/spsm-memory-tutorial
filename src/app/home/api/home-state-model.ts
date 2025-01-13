export interface INumOfCardsStateModel {
  numOfCards: number;
  cardsArray: ICard[];
  selectedCards: ISelectedCard[]
  matchedCards: string[];
  // flippedCards: boolean[];
}

export interface ICard {
  id: number;
  word: string;
}

export interface ISelectedCard {
  id: number;
  word: string;
  isFlipped: boolean;
}