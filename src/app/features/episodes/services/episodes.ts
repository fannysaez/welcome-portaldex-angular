import { Injectable, inject } from '@angular/core'; // Décorateurs et injection de dépendances
import { HttpClient, HttpParams } from '@angular/common/http'; // Requêtes HTTP
import { Observable } from 'rxjs'; // Observable : flux asynchrone de données qui émet une valeur quand la requête HTTP répond
import { Episode } from '../types/episode.type'; // Type Episode
import { ApiResponse } from '../../../shared/types/api-response.types'; // Type ApiResponse

@Injectable({
  providedIn: 'root',
})
export class Episodes { // Service Episodes
  private readonly http = inject(HttpClient); // Client HTTP injecté
  readonly url = 'https://rickandmortyapi.com/api/episode/'; // URL de l'API

  getEpisodes(page: number = 1): Observable<ApiResponse<Episode[]>> { // Renvoie un Observable contenant la réponse de l'API pour les épisodes
    return this.http.get<ApiResponse<Episode[]>>(this.url, { // Requête GET
      params: new HttpParams().set('page', page), // Paramètre page
    });
  }
}