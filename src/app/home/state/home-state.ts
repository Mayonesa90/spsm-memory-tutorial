import {Action, State, StateContext, StateToken} from "@ngxs/store";
import {INumOfCardsStateModel} from "../api/home-state-model";
import {Injectable} from "@angular/core";
import {UpdateNumOfCards} from "./home-actions";

const stateToken: StateToken<INumOfCardsStateModel> = new StateToken<INumOfCardsStateModel>("numOfCardsState");

@State({
  name: stateToken,
  defaults: {
    numOfCards: 4,
    cardsArray: ['hund', 'hund', 'katt', 'katt']
  },
})

@Injectable()
export class NumOfCardsState {
  @Action(UpdateNumOfCards)
  public updateNumOfCards(
    {patchState}: StateContext<INumOfCardsStateModel>, 
    {numOfCards}: UpdateNumOfCards
  ) : void {
    const animals = ['hund', 'katt', 'kanin', 'hamster'];
    const pairs = numOfCards / 2;

    const updatedCardsArray = []

    for (let i = 0; i < pairs; i++) {
      updatedCardsArray.push(animals[i % animals.length]);
      updatedCardsArray.push(animals[i % animals.length]);
    }
    
    patchState({numOfCards, cardsArray: updatedCardsArray});
        
  }
}