import { TestBed } from '@angular/core/testing';

import { DeliveryAgentsService } from './delivery-agents.service';

describe('DeliveryAgentsService', () => {
  let service: DeliveryAgentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliveryAgentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
