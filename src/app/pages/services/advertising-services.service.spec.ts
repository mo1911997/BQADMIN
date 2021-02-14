import { TestBed } from '@angular/core/testing';

import { AdvertisingServicesService } from './advertising-services.service';

describe('AdvertisingServicesService', () => {
  let service: AdvertisingServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdvertisingServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
