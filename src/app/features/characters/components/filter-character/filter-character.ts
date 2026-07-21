import { Component, input, output } from '@angular/core';

export interface CharacterFilters {
  status: string;
  species: string;
  gender: string;
}

@Component({
  selector: 'app-filter-character',
  imports: [],
  templateUrl: './filter-character.html',
  styleUrl: './filter-character.css',
})
export class FilterCharacter {
  status = input<string>('');
  species = input<string>('');
  gender = input<string>('');

  filterChange = output<CharacterFilters>();

  readonly statusOptions = ['Alive', 'Dead', 'unknown'];
  readonly genderOptions = ['Female', 'Male', 'Genderless', 'unknown'];
  readonly speciesOptions = [
    'Human',
    'Alien',
    'Humanoid',
    'Robot',
    'Animal',
    'Mythological Creature',
    'Cronenberg',
    'Disease',
    'unknown',
  ];

  onStatusChange(value: string) {
    this.emitFilters({ status: value, species: this.species(), gender: this.gender() });
  }

  onSpeciesChange(value: string) {
    this.emitFilters({ status: this.status(), species: value, gender: this.gender() });
  }

  onGenderChange(value: string) {
    this.emitFilters({ status: this.status(), species: this.species(), gender: value });
  }

  resetFilters() {
    this.emitFilters({ status: '', species: '', gender: '' });
  }

  private emitFilters(filters: CharacterFilters) {
    this.filterChange.emit(filters);
  }
}
