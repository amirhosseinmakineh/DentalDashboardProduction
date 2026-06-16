/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserManagmentService } from './userManagment.service';

describe('Service: UserManagment', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserManagmentService]
    });
  });

  it('should ...', inject([UserManagmentService], (service: UserManagmentService) => {
    expect(service).toBeTruthy();
  }));
});
