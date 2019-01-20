import { TestBed } from '@angular/core/testing';

import { CryptographyService } from './cryptography.service';

describe('CryptographyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CryptographyService = TestBed.get(CryptographyService);
    expect(service).toBeTruthy();
  });
});
