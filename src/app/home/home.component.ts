import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { NumOfCardsStateQueries,  } from './state/home-queries';
import { UpdateNumOfCards,  } from './state/home-actions';
import {FormsModule} from '@angular/forms'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <main>
      <h1 class=" font-extrabold text-3xl m-6">Memory Game</h1>
      <div class=" bg-slate-300 flex flex-row gap-2 p-4 border-2 mb-6 w-fit flex-shrink-0 items-center">
        <h3>Select number of cards:</h3>
        <select (change)=handleNumOfCardsChange() [(ngModel)]="selectedNumOfCards">
          <option  value="4">4</option>
          <option  value="6">6</option>
          <option  value="8">8</option>
        </select>
      </div>
     
      <button [routerLink]="['/spela']">Play game ></button>
    </main>
   
  `,
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  public numOfCards$!: Observable<number> ;
  public selectedNumOfCards: number = 4;
  public cardsArray$!: Observable<number[]>

  constructor(private readonly store: Store){}

  ngOnInit(): void {
      this.numOfCards$ = this.store.select(NumOfCardsStateQueries.numOfCards$);
      this.cardsArray$ = this.store.select(NumOfCardsStateQueries.cardsArray$);
      
      // Subscribe to the state and update the selectedNumOfCards value
      this.numOfCards$.subscribe((numOfCards) => {
        this.selectedNumOfCards = numOfCards; // Sync with the state
      });

      this.cardsArray$.subscribe((cardsArray) => {
        console.log('cardsArray updated:', cardsArray);
      })
  }


    public handleNumOfCardsChange(): void {
      this.store.dispatch(new UpdateNumOfCards(this.selectedNumOfCards));
    }

}

