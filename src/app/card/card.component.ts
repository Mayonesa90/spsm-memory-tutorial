import { Component, Input, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { NumOfCardsStateQueries } from '../home/state/home-queries';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ClearSelectedCards, UpdateSelectedCards, UpdateMatchedCards } from '../home/state/home-actions';
import { ISelectedCard, ICard } from '../home/api/home-state-model';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  template: `
    <div (click)="flipCard($event)" [attr.value]="card.word" class="card w-40 h-40 flex items-center justify-center">
      <div class="card-inner" [class.flipped]="isCardFlipped()">
        <div class="card-front">
          <p class="text-2xl">?</p>
        </div>
        <div class="card-back">
          <p class="text-2xl">{{card.word}}</p>
        </div>
      </div>  
   
    </div>
  `,
  styleUrl: './card.component.css'
})

export class CardComponent implements OnInit{
  
  @Input() card!: ICard
  selectedCards$!: Observable<ISelectedCard[]>
  selectedCards: ISelectedCard[] = []
  matchedCards$!: Observable<string[]>
  matchedCards: string[] = []
  isMatched: boolean = false
  // flippedCards$!: Observable<boolean[]>

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.selectedCards$ = this.store.select(NumOfCardsStateQueries.selectedCards$); // Assuming this selector exists
    this.selectedCards$.subscribe((selectedCards) => {
      this.selectedCards = selectedCards; // Sync with the state
    });

    this.matchedCards$ = this.store.select(NumOfCardsStateQueries.matchedCards$);
    this.matchedCards$.subscribe((matchedCards) => {
      console.log('Matched cards: ', matchedCards);
      
      this.matchedCards = matchedCards; // Keep the matched cards list updated
      this.isMatched = matchedCards.includes(this.card.word); // Check if the current card is matched
    });

    
  }

    public isCardFlipped(): boolean {
      // Check if this card's id exists in selectedCards and its `isFlipped` property is true
      const card = this.selectedCards.find(card => card.id === this.card.id);
      return card ? card.isFlipped : false;
    }


    public flipCard(event: Event): void {
        
      // Prevent flip if the card is already matched or flipped
      if (this.isCardFlipped() || this.matchedCards.includes(this.card.word)) {
        return;
      }

      // Mark the card as flipped
      const updatedSelectedCards = [...this.selectedCards];
      const cardIndex = updatedSelectedCards.findIndex(card => card.id === this.card.id);

      // If the card isn't in selectedCards, add it with `isFlipped: true`
      if (cardIndex === -1) {
        updatedSelectedCards.push({ id: this.card.id, word: this.card.word, isFlipped: true });
      } else {
        updatedSelectedCards[cardIndex].isFlipped = true;
      }

      // Update the store with the new selected cards state
      this.store.dispatch(new UpdateSelectedCards(updatedSelectedCards));

    setTimeout(() => {
      if (updatedSelectedCards.length === 2) {
        const [firstCard, secondCard] = updatedSelectedCards;

        // Check if the cards match (compare by id or word, depending on your requirements)
        if (firstCard.word === secondCard.word) {
          this.store.dispatch(new UpdateMatchedCards([firstCard.word]));
        } else {
          this.store.dispatch(new ClearSelectedCards());
        }
      }
    }, 1000);

   
  }
}
