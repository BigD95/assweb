import { TestBed } from '@angular/core/testing';

import { AwreqService } from './awreq.service';

describe('AwreqService', () => {
  let service: AwreqService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AwreqService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
