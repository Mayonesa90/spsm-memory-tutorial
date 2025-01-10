import {Injectable} from "@angular/core";
import { NumOfCardsState } from "./home-state";
import {Selector} from "@ngxs/store";
import { INumOfCardsStateModel } from "../api/home-state-model";
import { ICard } from "../api/home-state-model";

@Injectable()
export class NumOfCardsStateQueries {
  @Selector([NumOfCardsState])
  public static numOfCards$(state: INumOfCardsStateModel): number {
    return state.numOfCards;
  }

  @Selector([NumOfCardsState])
  public static cardsArray$(state: INumOfCardsStateModel): ICard[] {
    return state.cardsArray;
  }

  @Selector([NumOfCardsState])
  public static selectedCards$(state: INumOfCardsStateModel): ICard[] {
    return state.selectedCards;
  }

  @Selector([NumOfCardsState])
  public static matchedCards$(state: INumOfCardsStateModel): string[] {
    return state.matchedCards;
  }

  @Selector([NumOfCardsState])
  public static flippedCards$(state: INumOfCardsStateModel): boolean[] {
    return state.flippedCards;
  }
}

// interface card {
//   id: number;
//   word: string;
// }

