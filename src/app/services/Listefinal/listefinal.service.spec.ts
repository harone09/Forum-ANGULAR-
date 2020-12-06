import { TestBed } from '@angular/core/testing';

import { ListefinalService } from './listefinal.service';

describe('ListefinalService', () => {
  let service: ListefinalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListefinalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
