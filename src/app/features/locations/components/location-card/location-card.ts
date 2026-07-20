import { Component, input } from '@angular/core';
import { Location } from '../../types/location.type';

@Component({
  selector: 'app-location-card', // Sélecteur du composant
  imports: [], // Dépendances utilisées dans le template
  templateUrl: './location-card.html', // Template HTML associé
  styleUrl: './location-card.css', // Feuille de style associée
})
export class LocationCard {
  location = input.required<Location>(); // Donnée d'entrée obligatoire
}
