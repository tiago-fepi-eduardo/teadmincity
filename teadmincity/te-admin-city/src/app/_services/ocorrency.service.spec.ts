import { TestBed } from '@angular/core/testing';

import { OcorrencyService } from './ocorrency.service';

describe('OcorrencyService', () => {
  let service: OcorrencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OcorrencyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
