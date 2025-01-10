export interface INumOfCardsStateModel {
  numOfCards: number;
  cardsArray: ICard[];
  selectedCards: ICard[]
  matchedCards: string[];
  flippedCards: boolean[];
}

export interface ICard {
  id: number;
  word: string;
}