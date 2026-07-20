import { Component, OnInit, signal, inject } from '@angular/core'; // Angular core imports
import { Location } from '../../types/location.type'; // Location type definition
import { Locations as LocationsService } from '../../services/locations'; // Locations service
import { LocationCard } from '../../components/location-card/location-card'; // Location card component
import { ApiResponse, InfoResponse } from '../../../../shared/types/api-response.types'; // API response types

@Component({
  selector: 'app-locations',
  imports: [LocationCard],
  templateUrl: './locations.html',
  styleUrl: './locations.css',
})
export class Locations implements OnInit {
  private readonly locationsService = inject(LocationsService); // Inject locations service

  readonly locations = signal<Location[]>([]); // Signal pour stocker les planètes
  readonly infos = signal<InfoResponse>({} as InfoResponse); // Signal pour stocker les infos

  ngOnInit(): void { // Lifecycle hook
    this.locationsService.getLocations().subscribe((response: ApiResponse<Location[]>) => {
      this.locations.set(response.results); // Met à jour le signal des planètes
      this.infos.set(response.info); // Met à jour le signal des infos
    });
  }
}
