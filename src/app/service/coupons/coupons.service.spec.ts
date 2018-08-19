import { TestBed, inject } from '@angular/core/testing';

import { CouponsService } from './coupons.service';

describe('CouponsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CouponsService]
    });
  });

  it('should be created', inject([CouponsService], (service: CouponsService) => {
    expect(service).toBeTruthy();
  }));
});
