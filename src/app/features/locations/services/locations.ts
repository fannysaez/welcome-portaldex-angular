import { Injectable, inject } from '@angular/core'; // service injectable et injection de dépendances
import { HttpClient, HttpParams } from '@angular/common/http'; // client HTTP et gestion des params
import { Observable } from 'rxjs'; // type Observable pour les retours async
import { Location } from '../types/location.type'; // type Location local
import { ApiResponse } from '../../../shared/types/api-response.types'; // type générique de réponse API

@Injectable({
  providedIn: 'root', // service disponible globalement
})
export class Locations {
  private readonly http = inject(HttpClient); // instance HttpClient injectée
  readonly url = 'https://rickandmortyapi.com/api/location/'; // endpoint de l'API Rick & Morty

  // Récupère les locations, page optionnelle (par défaut 1)
  getLocations(page: number = 1): Observable<ApiResponse<Location[]>> {
    return this.http.get<ApiResponse<Location[]>>(this.url, {
      params: new HttpParams().set('page', page), // ajoute le paramètre de pagination
    });
  }
}
