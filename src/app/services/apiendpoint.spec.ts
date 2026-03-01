import { TestBed } from '@angular/core/testing';

import { Apiendpoint } from './apiendpoint';

describe('Apiendpoint', () => {
  let service: Apiendpoint;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Apiendpoint);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
