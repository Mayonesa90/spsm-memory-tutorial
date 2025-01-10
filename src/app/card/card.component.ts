import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { NumOfCardsStateQueries } from '../home/state/home-queries';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  
  template: `
    <div (click)="flipCard()" class="card w-40 h-40 rounded-md flex items-center justify-center">
      <div class="card-inner" [class.flipped]="isFlipped">
        <div class="card-front">
          <p class="text-2xl">?</p>
        </div>
        <div class="card-back">
          <p class="text-2xl">{{word}}</p>
        </div>
      </div>  
   
    </div>
  `,
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() word!: string
  isFlipped = false

  flipCard(): void {
    this.isFlipped = !this.isFlipped
    console.log('card is flipped');
    
  }
}
