/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ScoreLogService } from './scoreLog.service';

describe('Service: ScoreLog', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScoreLogService]
    });
  });

  it('should ...', inject([ScoreLogService], (service: ScoreLogService) => {
    expect(service).toBeTruthy();
  }));
});
