import { Component, OnInit, inject, signal } from '@angular/core'; // Importation des modules nécessaires pour créer un composant Angular et gérer les signaux.
import { RouterLink } from '@angular/router'; // Importation du module RouterLink pour permettre la navigation entre les routes de l'application.
import { CharactersService } from '../characters/services/characters'; // Importation du service CharactersService pour récupérer les données des personnages.
import { Episodes as EpisodesService } from '../episodes/services/episodes'; // Importation du service EpisodesService pour récupérer les données des épisodes.
import { Locations as LocationsService } from '../locations/services/locations'; // Importation du service LocationsService pour récupérer les données des lieux.

@Component({
  selector: 'app-home', // Déclare les directives utilisables dans le template HTML du composant.
  imports: [RouterLink], // Fichier HTML associé à ce composant.
  templateUrl: './home.html', // Fichier CSS associé à ce composant.
  styleUrl: './home.css',
})
// Composant de la page d'accueil.
export class Home implements OnInit {
  // Service pour récupérer les personnages.
  private readonly charactersService = inject(CharactersService); // Service pour récupérer les épisodes.
  private readonly episodesService = inject(EpisodesService);
  private readonly locationsService = inject(LocationsService);

  // Signal qui stocke le nombre de personnages.
  readonly charactersCount = signal(0); // Signal qui stocke le nombre de lieux.
  readonly locationsCount = signal(0);
  readonly episodesCount = signal(0);

  // Méthode appelée automatiquement lors de l'initialisation du composant.
  ngOnInit(): void {
    // Récupère les personnages puis met à jour le compteur.
    this.charactersService.getCharacterFromComponent().subscribe((response) => { // Met à jour le signal avec le nombre de personnages récupéré.
      this.charactersCount.set(response.info.count); // Met à jour le signal avec le nombre de personnages récupéré.
    });

    // Récupère les lieux puis met à jour le compteur.
    this.locationsService.getLocations().subscribe((response) => {
      this.locationsCount.set(response.info.count);
    });

    // Récupère les épisodes puis met à jour le compteur.
    this.episodesService.getEpisodes().subscribe((response) => {
      this.episodesCount.set(response.info.count); // Met à jour le signal avec le nombre d'épisodes récupéré.
    });
  }
}
