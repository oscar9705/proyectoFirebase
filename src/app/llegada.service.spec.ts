import { TestBed } from '@angular/core/testing';

import { LlegadaService } from './llegada.service';

describe('LlegadaService', () => {
  let service: LlegadaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LlegadaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
