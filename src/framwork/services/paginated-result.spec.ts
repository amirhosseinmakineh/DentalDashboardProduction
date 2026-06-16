import { TestBed } from '@angular/core/testing';

import { PaginatedResult } from './paginated-result';

describe('PaginatedResult', () => {
  let service: PaginatedResult;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaginatedResult);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
