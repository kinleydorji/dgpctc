import { TestBed } from '@angular/core/testing';

import { UserregisterService } from './userregister.service';

describe('UserregisterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserregisterService = TestBed.get(UserregisterService);
    expect(service).toBeTruthy();
  });
});
