import { TestBed, inject } from '@angular/core/testing';

import { LoginGaurdService } from './login-gaurd.service';

describe('LoginGaurdService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginGaurdService]
    });
  });

  it('should be created', inject([LoginGaurdService], (service: LoginGaurdService) => {
    expect(service).toBeTruthy();
  }));
});
