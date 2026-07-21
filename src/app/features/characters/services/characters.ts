import { Injectable, inject, signal } from '@angular/core'; // Déclare un service injectable et utilise les signals Angular.
import { HttpClient, HttpParams } from '@angular/common/http'; // HttpClient fait les requêtes HTTP, HttpParams construit les paramètres.
import { Observable, catchError, of, tap } from 'rxjs'; // Observable gère l'asynchrone, tap observe les valeurs, catchError gère les erreurs, of crée un observable.
import { Character } from '../types/character.type'; // Type représentant un personnage.
import { ApiResponse } from '../../../shared/types/api-response.types'; // Type représentant la réponse de l'API.

@Injectable({
  providedIn: 'root',
}) // Rend le service disponible globalement dans l'application.
export class CharactersService {
  private readonly http = inject(HttpClient); // Injection de HttpClient pour appeler l'API.
  private characters = signal<Character[]>([]); // Signal interne qui stocke la liste des personnages.

  readonly characterSignal = this.characters.asReadonly(); // Version en lecture seule du signal pour l'extérieur.
  readonly url = 'https://rickandmortyapi.com/api/character/'; // URL de base de l'API.

  getCharactersFromService(page: number = 1): Observable<ApiResponse<Character[]>> {// Méthode pour récupérer les personnages depuis le service.
    return this.http
      .get<ApiResponse<Character[]>>(this.url, {// Appel HTTP GET à l'API.
        params: { page: page }, // Envoie la page demandée à l'API.
      })
      .pipe(tap((response: ApiResponse<Character[]>) => this.characters.set(response.results))); // Met à jour le signal avec les résultats.
  }

  getCharacterFromComponent(page: number = 1): Observable<ApiResponse<Character[]>> { // Méthode pour récupérer les personnages depuis le composant.
    return this.http.get<ApiResponse<Character[]>>(this.url, { // Appel HTTP GET à l'API.
      params: { page: page }, // Demande une page précise de personnages.
    });
  }

  // Recherche paginée par nom, avec filtres optionnels statut/espèce/genre.
  // Si aucun personnage ne correspond, l'API renvoie une 404 : on retourne donc une réponse vide.
  getCharacters(
    page: number = 1,
    name?: string,
    status?: string,
    species?: string,
    gender?: string,
  ): Observable<ApiResponse<Character[]>> {// Méthode pour récupérer les personnages avec pagination, recherche par nom et filtres.
    let params = new HttpParams().set('page', page); // Initialise les paramètres avec la page.

    if (name) { // Vérifie si un nom est fourni pour la recherche.
      params = params.set('name', name); // Ajoute le filtre de recherche par nom si fourni.
    }

    if (status) { // Filtre par statut si fourni.
      params = params.set('status', status);
    }

    if (species) { // Filtre par espèce si fourni.
      params = params.set('species', species);
    }

    if (gender) { // Filtre par genre si fourni.
      params = params.set('gender', gender);
    }

    return this.http.get<ApiResponse<Character[]>>(this.url, { params }).pipe(// Appel HTTP GET à l'API avec les paramètres.
      tap((response: ApiResponse<Character[]>) => this.characters.set(response.results)), // Sauvegarde les résultats dans le signal.
      catchError(() => {// Gère les erreurs, notamment les 404 si aucun personnage ne correspond à la recherche.
        this.characters.set([]); // Vide la liste si la requête échoue.
        return of<ApiResponse<Character[]>>({// Retourne une réponse vide pour éviter les erreurs dans le composant.
          info: { count: 0, pages: 0, next: null, prev: null }, // Réponse info vide.
          results: [], // Aucun résultat trouvé.
        });
      }),
    );
  }
}
