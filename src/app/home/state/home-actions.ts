import {ICard} from '../api/home-state-model'

export class UpdateNumOfCards {
  static readonly type: string = "[Home] Update NumOfCards";

  constructor(public numOfCards: number) {}
}

export class UpdateSelectedCards {
  static readonly type: string = "[Card] Update selectedCards";
  
  constructor(public selectedCards: ICard[]) {}
}

export class UpdateMatchedCards {
  static readonly type = "[Card] Update matchedCards";

  constructor(public matchedCards: string[]) {}
}

export class ClearSelectedCards {
  static readonly type = "[Card] Clear selectedCards";
}

