import {Injectable} from "@angular/core";
import { NumOfCardsState } from "./home-state";
import {Selector} from "@ngxs/store";
import { INumOfCardsStateModel } from "../api/home-state-model";

@Injectable()
export class NumOfCardsStateQueries {
  @Selector([NumOfCardsState])
  public static numOfCards$(state: INumOfCardsStateModel): number {
    return state.numOfCards;
  }

  @Selector([NumOfCardsState])
  public static cardsArray$(state: INumOfCardsStateModel): number[] {
    return state.cardsArray;
  }
}


