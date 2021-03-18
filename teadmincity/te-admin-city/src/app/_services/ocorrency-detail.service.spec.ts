import { TestBed } from '@angular/core/testing';

import { OcorrencyDetailService } from './ocorrency-detail.service';

describe('OcorrencyDetailService', () => {
  let service: OcorrencyDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OcorrencyDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
