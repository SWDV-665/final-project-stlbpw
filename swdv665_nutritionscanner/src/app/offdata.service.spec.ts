import { TestBed } from '@angular/core/testing';

import { OffdataService } from './offdata.service';

describe('OffdataService', () => {
  let service: OffdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OffdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
