import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-play',
  imports: [RouterModule],
  template: `
    <header>
    <button class="btn-back" [routerLink]="['/']">< Tillbaka till startsidan</button>
      <h1>Spela</h1>
    </header>
    <main>
      
    </main>
  `,
  styleUrl: './play.component.css'
})
export class PlayComponent {

}
