import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'saisie_inventaire';
  inputValue: string = '';
  inputresultValue: string = '';

  updateInput(value: string) {
    this.inputValue += value; // Concatène la nouvelle valeur à la valeur existante
  }

  calculateResult() {
    try {
      // Évalue la chaîne de calcul dans le deuxième champ input
      this.inputresultValue = eval(this.inputValue);
    } catch (error) {
      // Gère les erreurs d'évaluation
      console.error('Erreur de calcul :', error);
    }
  }
  enterData() { }

  clearcalcul() { this.inputValue = ''; }
}

