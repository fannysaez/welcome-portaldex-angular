import { Component, OnInit, signal, inject } from '@angular/core'; // Importe les décorateurs et fonctionnalités Angular essentiels
import { FormsModule } from '@angular/forms'; // Module pour gérer les formulaires
import { Character } from '../../types/character.type'; // Type définissant la structure d'un personnage
import { CharacterCard } from '../../components/character-card/character-card'; // Composant pour afficher une carte de personnage
import { CharactersService } from '../../services/characters'; // Service pour récupérer les données des personnages
import { ApiResponse, InfoResponse } from '../../../../shared/types/api-response.types'; // Types pour les réponses API
import { Pagination } from '../../components/pagination/pagination'; // Composant pour la pagination
import { PageNotFound } from '../../../error/page-not-found/page-not-found'; // Composant 404 réutilisé pour l'état "aucun résultat"
import {
  FilterCharacter,
  CharacterFilters,
} from '../../components/filter-character/filter-character'; // Composant pour filtrer les personnages (statut, espèce, genre)

@Component({
  selector: 'app-characters', // Sélecteur du composant
  imports: [CharacterCard, Pagination, FormsModule, PageNotFound, FilterCharacter], // Composants et modules importés dans ce composant
  templateUrl: './characters.html',
  styleUrl: './characters.css',
})
export class Characters implements OnInit { // Classe du composant implémentant OnInit
  private readonly characterService = inject(CharactersService); // Injection du service pour accéder aux données
  readonly characters = this.characterService.characterSignal; // Signal contenant la liste des personnages
  readonly infos = signal<InfoResponse>({} as InfoResponse); // Signal contenant les infos de pagination

  currentPage = signal(1); // Signal de la page actuelle (initialisée à 1)
  totalPage = signal(0); // Signal du nombre total de pages
  searchTerm = signal(''); // Signal du terme de recherche
  noResults = signal(false); // Signal indiquant s'il n'y a aucun résultat

  statusFilter = signal(''); // Signal du filtre statut
  speciesFilter = signal(''); // Signal du filtre espèce
  genderFilter = signal(''); // Signal du filtre genre

  ngOnInit() { // Hook du cycle de vie Angular appelé après l'initialisation
    this.fetchCharacters(1); // Charge les personnages de la première page au démarrage
  }

  fetchCharacters(page: number) { // Méthode pour récupérer les personnages pour une page donnée
    this.currentPage.set(page); // Met à jour le numéro de la page actuelle

    this.characterService // Appelle le service
      .getCharacters(
        page,
        this.searchTerm() || undefined,
        this.statusFilter() || undefined,
        this.speciesFilter() || undefined,
        this.genderFilter() || undefined,
      ) // Récupère les personnages avec la page, la recherche et les filtres
      .subscribe((response: ApiResponse<Character[]>) => { // S'abonne à la réponse
        this.infos.set(response.info); // Stocke les infos de pagination dans le signal
        this.totalPage.set(this.infos().pages); // Met à jour le nombre total de pages
        this.noResults.set(response.results.length === 0); // Indique si la recherche a retourné 0 résultats
      });
  }

  search() { // Méthode de recherche
    this.fetchCharacters(1); // Réinitialise à la page 1 et lance la recherche
  }

  resetSearch() { // Méthode pour réinitialiser la recherche
    this.searchTerm.set(''); // Efface le terme de recherche
    this.fetchCharacters(1); // Recharge les personnages de la première page
  }

  onFilterChange(filters: CharacterFilters) { // Méthode appelée quand un filtre change
    this.statusFilter.set(filters.status); // Met à jour le filtre statut
    this.speciesFilter.set(filters.species); // Met à jour le filtre espèce
    this.genderFilter.set(filters.gender); // Met à jour le filtre genre
    this.fetchCharacters(1); // Relance la recherche depuis la première page
  }

  changePage(page: number) { // Méthode pour changer de page
    this.fetchCharacters(page); // Récupère les personnages de la nouvelle page
  }
}
