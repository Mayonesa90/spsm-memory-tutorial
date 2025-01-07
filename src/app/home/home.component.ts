import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <main>
      <h1>Memory Game</h1>
      <button [routerLink]="['/spela']">Play game ></button>
    </main>
   
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
