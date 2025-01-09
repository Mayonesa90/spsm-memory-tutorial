import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { NumOfCardsStateQueries } from '../home/state/home-queries';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  template: `
    <div class=" w-40 h-40 bg-slate-500 rounded-md flex items-center justify-center">
    <p class="text-2xl">{{word}}</p>
    </div>
  `,
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() word!: string
  
}
