import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Désactive l'ouverture automatique du clavier virtuel pour les champs input et textarea
/* document.addEventListener('DOMContentLoaded', function () {
  var inputElements = document.querySelectorAll('input, textarea');
  for (var i = 0; i < inputElements.length; i++) {
    inputElements[i].setAttribute('readonly', 'readonly');
  }
}); */

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'saisie_inventaire';
  inputValue: string = '';
  inputresultValue: string = '';
  inputTitreInventaire: string = '';
  selectedUnit: string = '';
  dataRows: any[] = [];

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
      this.inputresultValue = 'ERREUR de calcul';
    }
  }

  clearcalcul() { this.inputValue = ''; this.inputresultValue = ''; } // Supprime tout les caractères de inputValue
  clearOnecalcul() {
    this.inputValue = this.inputValue.slice(0, -1); // Supprime le dernier caractère de inputValue
  }


  enregistrement() {
    console.log("Valeur de inputTitreInventaire :", this.inputTitreInventaire);
    console.log("Valeur de inputresultValue :", this.inputresultValue);
    console.log("Unité sélectionnée :", this.selectedUnit);
    try {
      const newData = {
        nom: this.inputTitreInventaire,
        valeur: this.inputresultValue,
        unite: this.selectedUnit
      };

      this.dataRows.push(newData);

      // Réinitialisez les valeurs après l'enregistrement
      this.inputTitreInventaire = '';
      this.inputValue = '';
      this.inputresultValue = '';
      console.log(this.dataRows)
    } catch (e) {
      console.error('Erreur dans l\'enregistrement :', e);
      alert('Erreur dans l\'enregistrement')
    }

  }
}

