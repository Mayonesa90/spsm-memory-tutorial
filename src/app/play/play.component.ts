import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {FormsModule} from '@angular/forms'
import { AsyncPipe } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { NumOfCardsStateQueries } from '../home/state/home-queries';

@Component({
  selector: 'app-play',
  imports: [CommonModule, RouterModule, FormsModule, AsyncPipe, CardComponent],
  template: `
    <header>
    <button class="btn-back" [routerLink]="['/']">< Tillbaka till startsidan</button>
      <h1 class="font-extrabold text-3xl m-6">Spela</h1>
    </header>
    <main class="flex flex-col items-center">
      <p class="mb-10">Selected number of cards: {{numOfCards$ | async}}</p>
        <section 
          [ngClass]="gridLayout"
          class="grid gap-2"
        >
          <app-card *ngFor="let card of cardsArray$ | async"></app-card>
      </section>
    </main>
  `,
  styleUrl: './play.component.css'
})
export class PlayComponent implements OnInit {
  public numOfCards$!: Observable<number> ;
  public cardsArray$!: Observable<number[]>;
  public numOfCards: number = 4;
  public gridLayout: string = 'grid-cols-2';

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.numOfCards$ = this.store.select(NumOfCardsStateQueries.numOfCards$);
    this.cardsArray$ = this.store.select(NumOfCardsStateQueries.cardsArray$);
    
    this.numOfCards$.subscribe((numOfCards) => {
      this.numOfCards = numOfCards;
      if(numOfCards === 4) {
        this.gridLayout = 'grid-cols-2'
      } else if(numOfCards === 6) {
        this.gridLayout = 'grid-cols-3'
      } else if(numOfCards === 8) {
        this.gridLayout = 'grid-cols-4'
      } else {
        this.gridLayout = 'grid-cols-2'
      }
    });
  }  

}
