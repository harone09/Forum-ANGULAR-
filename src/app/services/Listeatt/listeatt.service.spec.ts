import { TestBed } from '@angular/core/testing';

import { ListeattService } from './listeatt.service';

describe('ListeattService', () => {
  let service: ListeattService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListeattService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
