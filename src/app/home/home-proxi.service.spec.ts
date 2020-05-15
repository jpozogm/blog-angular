import { TestBed } from '@angular/core/testing';

import { HomeProxiService } from './home-proxi.service';

describe('HomeProxiService', () => {
  let service: HomeProxiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeProxiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
