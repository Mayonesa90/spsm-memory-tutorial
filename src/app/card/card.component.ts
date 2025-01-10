import { Component, Input, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { NumOfCardsStateQueries } from '../home/state/home-queries';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ClearSelectedCards, UpdateSelectedCards, UpdateMatchedCards } from '../home/state/home-actions';
import { ICard } from '../home/api/home-state-model';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  template: `
    <div (click)="flipCard($event)" [attr.value]="card.word" class="card w-40 h-40 flex items-center justify-center">
      <div class="card-inner" [class.flipped]="isFlipped">
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
  isFlipped = false
  isMatched = false
  selectedCards$!: Observable<ICard[]>
  selectedCards: ICard[] = []
  matchedCards$!: Observable<string[]>
  matchedCards: string[] = []
  flippedCards$!: Observable<boolean[]>

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.selectedCards$ = this.store.select(NumOfCardsStateQueries.selectedCards$); // Assuming this selector exists
    this.selectedCards$.subscribe((selectedCards) => {
      this.selectedCards = selectedCards; // Sync with the state
      // console.log('Selected cards: ', this.selectedCards);
    });

    this.flippedCards$ = this.store.select(state => state.numOfCardsState.flippedCards);
    this.flippedCards$.subscribe((flippedCards) => {
      this.isFlipped = flippedCards[this.selectedCards.findIndex(card => card.word === this.card.word)];
    });

    this.store.select(NumOfCardsStateQueries.matchedCards$).subscribe((matchedCards) => {
      this.isMatched = matchedCards.includes(this.card.word);
    })
  }

  flipCard(event: Event): void {
    if (this.isMatched || this.isFlipped){
      return;
    }

    this.isFlipped = true

    const cardElement = event.currentTarget as HTMLElement;
    const cardValue = cardElement.getAttribute('value');

    if (cardValue) {
      const card = { id: this.selectedCards.length + 1, word: cardValue }; // Adjust logic to find the actual card
      this.selectedCards.push(card);
      this.store.dispatch(new UpdateSelectedCards(this.selectedCards));
      
      console.log('selected cards:', this.selectedCards);

      setTimeout(()=> {
        if(this.selectedCards.length === 2){
          console.log('length is 2');
          const [firstCard, secondCard] = this.selectedCards;
          if (firstCard === secondCard){
            this.store.dispatch(new UpdateMatchedCards([firstCard.word]));
          } else{
            this.isFlipped = false;
            this.store.dispatch(new ClearSelectedCards());
          }
        }
      }, 1000)
    }
  }
}
