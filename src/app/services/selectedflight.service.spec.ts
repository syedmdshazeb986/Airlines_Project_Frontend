import { TestBed } from '@angular/core/testing';

import { SelectedflightService } from './selectedflight.service';

describe('SelectedflightService', () => {
  let service: SelectedflightService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedflightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
