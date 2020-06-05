import { TestBed } from '@angular/core/testing';

import { NotificationsBusService } from './notifications-bus.service';

describe('NotificationsBusService', () => {
  let service: NotificationsBusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationsBusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
