import { TestBed } from '@angular/core/testing';

import { AdminflightcrudService } from './adminflightcrud.service';

describe('AdminflightcrudService', () => {
  let service: AdminflightcrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminflightcrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
