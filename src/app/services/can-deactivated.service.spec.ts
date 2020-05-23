import { TestBed } from '@angular/core/testing';

import { CanDeactivatedService } from './can-deactivated.service';

describe('CanDeactivatedService', () => {
  let service: CanDeactivatedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanDeactivatedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
