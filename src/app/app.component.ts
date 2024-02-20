import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

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

  toggleSaisie() {
    const calculetteElement = document.querySelector('.calculette') as HTMLElement;
    const inventaireElement = document.querySelector('.inventaire') as HTMLElement;
    if (calculetteElement && inventaireElement) {
      calculetteElement.style.display = 'flex';
      inventaireElement.style.display = 'none';
    }
  }

  toggleInventaire() {
    const calculetteElement = document.querySelector('.calculette') as HTMLElement;
    const inventaireElement = document.querySelector('.inventaire') as HTMLElement;
    if (calculetteElement && inventaireElement) {
      calculetteElement.style.display = 'none';
      inventaireElement.style.display = 'flex';
    }
  }


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
  modifinventaire() {

  }

  exportCSV() {
    const csvContent = this.dataRows.map(row => Object.values(row).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
  importCSV() {
    console.log("importation CSV en cours...")
  }
}

