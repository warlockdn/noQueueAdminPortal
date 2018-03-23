import { TestBed, inject } from '@angular/core/testing';

import { MenuManagerService } from './menu-manager.service';

describe('MenuManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MenuManagerService]
    });
  });

  it('should be created', inject([MenuManagerService], (service: MenuManagerService) => {
    expect(service).toBeTruthy();
  }));
});
