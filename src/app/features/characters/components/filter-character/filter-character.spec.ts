import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterCharacter } from './filter-character';

describe('FilterCharacter', () => {
  let component: FilterCharacter;
  let fixture: ComponentFixture<FilterCharacter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterCharacter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterCharacter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
