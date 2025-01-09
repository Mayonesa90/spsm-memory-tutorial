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
    <main>
      <p class="text-center">Selected number of cards: {{numOfCards$ | async}}</p>
      <section>
        <div *ngFor="let card of cardsArray$ | async">
          <app-card></app-card>
        </div>
      </section>
    </main>
  `,
  styleUrl: './play.component.css'
})
export class PlayComponent implements OnInit {
  public numOfCards$!: Observable<number> ;
  public cardsArray$!: Observable<number[]>;

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.numOfCards$ = this.store.select(NumOfCardsStateQueries.numOfCards$);
    this.cardsArray$ = this.store.select(NumOfCardsStateQueries.cardsArray$);
  }
}
