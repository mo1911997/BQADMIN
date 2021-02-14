import { TestBed } from '@angular/core/testing';

import { SubadminsService } from './subadmins.service';

describe('SubadminsService', () => {
  let service: SubadminsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubadminsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
