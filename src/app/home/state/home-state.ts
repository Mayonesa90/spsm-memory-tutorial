import {Action, State, StateContext, StateToken} from "@ngxs/store";
import {INumOfCardsStateModel} from "../api/home-state-model";
import {Injectable} from "@angular/core";
import {UpdateNumOfCards, UpdateSelectedCards, UpdateMatchedCards, ClearSelectedCards} from "./home-actions";

const stateToken: StateToken<INumOfCardsStateModel> = new StateToken<INumOfCardsStateModel>("numOfCardsState");

@State({
  name: stateToken,
  defaults: {
    numOfCards: 4,
    cardsArray: [
      {id:1, word: 'hund'},
      {id:2, word: 'hund'},
      {id:3, word: 'katt'},
      {id:4, word: 'katt'},
    ],
    selectedCards: [],
    matchedCards: [],
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
    let id = 1

    for (let i = 0; i < pairs; i++) {
      updatedCardsArray.push({ id: id++, word: animals[i % animals.length] });
      updatedCardsArray.push({ id: id++, word: animals[i % animals.length] });
    }
    
    patchState({
      numOfCards, 
      cardsArray: updatedCardsArray,
      selectedCards: []
    });
  }

  @Action(UpdateSelectedCards)
  public updateSelectedCards(
    {patchState, getState}: StateContext<INumOfCardsStateModel>,
    {selectedCards}: UpdateSelectedCards
  ) : void {
    const state = getState()
    selectedCards.forEach(card => {
      const existingCardIndex = state.selectedCards.findIndex(c => c.id === card.id);
      if (existingCardIndex !== -1) {
        state.selectedCards[existingCardIndex].isFlipped = true;
      } else {
        state.selectedCards.push({ ...card, isFlipped: true });
      }
    })

    patchState({
      selectedCards: [...state.selectedCards]
    })

    console.log('Updated selectedCards:', selectedCards);
    
  }

  @Action(UpdateMatchedCards)
  public updateMatchedCards(
    {patchState, getState}: StateContext<INumOfCardsStateModel>,
    {matchedCards}: UpdateMatchedCards
  ) : void {
    const state = getState()
    patchState({
      matchedCards: [...state.matchedCards, ...matchedCards],
    })
  }

  @Action(ClearSelectedCards)
  public clearSelectedCards(
    {patchState, getState} : StateContext<INumOfCardsStateModel>
  ) : void {
    const state = getState()
    patchState({
      selectedCards: [],
    })
    console.log('selected cards cleared');
  }
}
