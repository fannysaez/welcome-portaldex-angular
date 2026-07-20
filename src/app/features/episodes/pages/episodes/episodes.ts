import { Component, OnInit, signal, inject } from '@angular/core';
import { Episode } from '../../types/episode.type';
import { Episodes as EpisodesService } from '../../services/episodes';
import { ApiResponse, InfoResponse } from '../../../../shared/types/api-response.types';

@Component({
  selector: 'app-episodes',
  imports: [],
  templateUrl: './episodes.html',
  styleUrl: './episodes.css',
})
export class Episodes implements OnInit {
  private readonly episodesService = inject(EpisodesService);

  readonly episodes = signal<Episode[]>([]);
  readonly infos = signal<InfoResponse>({} as InfoResponse);

  ngOnInit(): void {
    this.episodesService.getEpisodes().subscribe((response: ApiResponse<Episode[]>) => {
      this.episodes.set(response.results);
      this.infos.set(response.info);
    });
  }
}
