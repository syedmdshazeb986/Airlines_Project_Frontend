import { TestBed } from '@angular/core/testing';

import { FetchseatsService } from './fetchseats.service';

describe('FetchseatsService', () => {
  let service: FetchseatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchseatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
