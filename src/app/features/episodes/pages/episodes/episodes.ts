import { Component, OnInit, signal, inject } from '@angular/core'; // Angular core imports
import { Episode } from '../../types/episode.type'; // Episode type definition
import { Episodes as EpisodesService } from '../../services/episodes'; // Episodes service
import { ApiResponse, InfoResponse } from '../../../../shared/types/api-response.types'; // API response types

@Component({
  selector: 'app-episodes', // Component selector
  imports: [], // Imported modules
  templateUrl: './episodes.html', // Template file
  styleUrl: './episodes.css', // Stylesheet file
})
export class Episodes implements OnInit {
  private readonly episodesService = inject(EpisodesService); // Inject episodes service

  readonly episodes = signal<Episode[]>([]); // Signal pour stocker les épisodes
  readonly infos = signal<InfoResponse>({} as InfoResponse); // Signal pour stocker les infos

  ngOnInit(): void { // Lifecycle hook
    this.episodesService.getEpisodes().subscribe((response: ApiResponse<Episode[]>) => {
      this.episodes.set(response.results); // Met à jour le signal des épisodes
      this.infos.set(response.info); // Met à jour le signal des infos
    });
  }
}
