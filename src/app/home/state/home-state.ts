import {Action, State, StateContext, StateToken} from "@ngxs/store";
import {INumOfCardsStateModel} from "../api/home-state-model";
import {Injectable} from "@angular/core";
import {UpdateNumOfCards} from "./home-actions";

const stateToken: StateToken<INumOfCardsStateModel> = new StateToken<INumOfCardsStateModel>("numOfCardsState");

@State({
  name: stateToken,
  defaults: {
    numOfCards: 4,
    cardsArray: [0, 1, 2, 3]
  },
})

@Injectable()
export class NumOfCardsState {
  @Action(UpdateNumOfCards)
  public updateNumOfCards(
    {patchState}: StateContext<INumOfCardsStateModel>, 
    {numOfCards}: UpdateNumOfCards
  ) : void {
    const updatedCardsArray = Array.from({length: numOfCards}, (_, index) => index);
    patchState({numOfCards, cardsArray: updatedCardsArray});    
  }
}